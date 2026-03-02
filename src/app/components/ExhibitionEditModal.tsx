import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { supabase, type Exhibition } from '../lib/supabase';
import { toast } from 'sonner';

interface ExhibitionEditModalProps {
  exhibition: Exhibition | null;
  onClose: () => void;
  onSaved?: () => void;
}

const exhibitionTypes = [
  'Samostalna izložba',
  'Grupna izložba',
  'Kolonija',
  'Simpozijum',
  'Akademska izložba',
];

export function ExhibitionEditModal({ exhibition, onClose, onSaved }: ExhibitionEditModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Exhibition>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    if (exhibition) {
      setFormData(exhibition);
      setPreviewUrl(exhibition.image || '');
    } else {
      setFormData({
        title: '',
        type: 'Grupna izložba',
        venue: '',
        location: '',
        date: new Date().getFullYear().toString(),
        description: '',
        image: '',
        sort_order: 0,
      });
      setPreviewUrl('');
    }
    setImageFile(null);
  }, [exhibition]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      if (!formData.title || !formData.venue || !formData.location) {
        toast.error('Popuni obavezna polja');
        return;
      }

      let imageUrl = formData.image;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const dataToSave = {
        title: formData.title,
        type: formData.type || 'Grupna izložba',
        venue: formData.venue,
        location: formData.location,
        date: formData.date,
        description: formData.description,
        image: imageUrl,
        sort_order: formData.sort_order || 0,
      };

      if (exhibition?.id) {
        // Update
        const { error } = await supabase
          .from('exhibitions')
          .update(dataToSave)
          .eq('id', exhibition.id);

        if (error) throw error;
        toast.success('Izložba ažurirana!');
      } else {
        // Insert
        const { error } = await supabase
          .from('exhibitions')
          .insert([dataToSave]);

        if (error) throw error;
        toast.success('Izložba dodata!');
      }

      onClose();
      onSaved?.();
      window.dispatchEvent(new Event('mirza:refresh'));
    } catch (error: any) {
      console.error('Error saving exhibition:', error);
      toast.error('Greška pri čuvanju: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-[#1a1a1a] text-[#f5f0eb] border-white/10 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{exhibition ? 'Izmeni Izložbu' : 'Dodaj Novu Izložbu'}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Image Upload */}
          <div className="flex flex-col gap-2">
            <Label>Slika Izložbe</Label>
            <div className="flex gap-4 items-start">
              {previewUrl && (
                <div className="w-32 h-32 relative border border-white/10 rounded overflow-hidden flex-shrink-0">
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1">
                <Input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange}
                  className="bg-white/5 border-white/10 text-[#f5f0eb]"
                />
                <p className="text-xs text-white/40 mt-2">JPG, PNG, WebP. Maks 5MB</p>
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label>Naziv Izložbe *</Label>
            <Input 
              value={formData.title || ''} 
              onChange={e => setFormData({...formData, title: e.target.value})}
              placeholder="npr. Tragovi"
              className="bg-white/5 border-white/10"
            />
          </div>

          {/* Type */}
          <div className="space-y-2">
            <Label>Tip Izložbe</Label>
            <select 
              value={formData.type || 'Grupna izložba'}
              onChange={e => setFormData({...formData, type: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-[#f5f0eb]"
            >
              {exhibitionTypes.map(type => (
                <option key={type} value={type} className="bg-[#1a1a1a]">{type}</option>
              ))}
            </select>
          </div>

          {/* Venue & Location */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Mesto (Galerija) *</Label>
              <Input 
                value={formData.venue || ''} 
                onChange={e => setFormData({...formData, venue: e.target.value})}
                placeholder="npr. Zavičajni muzej"
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label>Lokacija *</Label>
              <Input 
                value={formData.location || ''} 
                onChange={e => setFormData({...formData, location: e.target.value})}
                placeholder="npr. Visoko"
                className="bg-white/5 border-white/10"
              />
            </div>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label>Datum</Label>
            <Input 
              value={formData.date || ''} 
              onChange={e => setFormData({...formData, date: e.target.value})}
              placeholder="npr. 2024"
              className="bg-white/5 border-white/10"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Opis</Label>
            <Textarea 
              value={formData.description || ''} 
              onChange={e => setFormData({...formData, description: e.target.value})}
              placeholder="Opis izložbe..."
              className="bg-white/5 border-white/10 h-24"
            />
          </div>

          {/* Sort Order */}
          <div className="space-y-2">
            <Label>Redosled</Label>
            <Input 
              type="number"
              value={formData.sort_order || 0} 
              onChange={e => setFormData({...formData, sort_order: parseInt(e.target.value)})}
              className="bg-white/5 border-white/10"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-white/10 hover:bg-white/5 text-[#f5f0eb]">
            Otkaži
          </Button>
          <Button onClick={handleSave} disabled={loading} className="bg-[#c9a96e] text-black hover:bg-[#b0935d]">
            {loading ? 'Čuvanje...' : 'Sačuvaj'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

