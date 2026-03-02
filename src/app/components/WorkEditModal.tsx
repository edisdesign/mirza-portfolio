import { useState, useEffect } from 'react';
// ISPRAVLJENE PUTANJE: Umesto '@/components/ui/...' koristimo './ui/...'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
// Ostatak je isti
import { supabase, type Work } from '../lib/supabase';
import { toast } from 'sonner';

interface WorkEditModalProps {
  work: Work | null;
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}

export function WorkEditModal({ work, open, onClose, onSave }: WorkEditModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Work>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  // Reset form when modal opens or work changes
  useEffect(() => {
    if (work) {
      setFormData(work);
      setPreviewUrl(work.image || '');
    } else {
      // Default values for new work
      setFormData({
        title: '',
        category: 'Ulje na platnu',
        technique: '',
        year: new Date().getFullYear().toString(),
        size: '',
        description: '',
        featured: false,
        landscape: false,
        image: ''
      });
      setPreviewUrl('');
    }
    setImageFile(null);
  }, [work, open]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      // Create local preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload na 'images' bucket
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    // Dobijanje URL-a
    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      let imageUrl = formData.image;

      // 1. Upload image if a new file is selected
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      // 2. Prepare data for DB
      const dataToSave = {
        ...formData,
        image: imageUrl,
      };

      if (work?.id) {
        // UPDATE existing work
        const { error } = await supabase
          .from('works')
          .update(dataToSave)
          .eq('id', work.id);

        if (error) throw error;
        toast.success('Rad uspešno izmenjen!');
      } else {
        // INSERT new work
        const { error } = await supabase
          .from('works')
          .insert([dataToSave]);

        if (error) throw error;
        toast.success('Novi rad dodat!');
      }

      onSave(); 
      onClose();
    } catch (error: any) {
      console.error('Error saving work:', error);
      toast.error('Greška pri čuvanju: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#1a1a1a] text-[#f5f0eb] border-white/10 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{work ? 'Izmeni Rad' : 'Dodaj Novi Rad'}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Image Upload Section */}
          <div className="flex flex-col gap-2">
            <Label>Slika Rada</Label>
            <div className="flex gap-4 items-start">
              {previewUrl && (
                <div className="w-32 h-32 relative border border-white/10 rounded overflow-hidden flex-shrink-0">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              )}
              <div className="flex-1">
                <Input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange}
                  className="bg-white/5 border-white/10 text-[#f5f0eb]"
                />
                <p className="text-xs text-white/40 mt-2">
                  Podržani formati: JPG, PNG, WebP. Maksimalna veličina 5MB.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Naslov</Label>
              <Input 
                value={formData.title || ''} 
                onChange={e => setFormData({...formData, title