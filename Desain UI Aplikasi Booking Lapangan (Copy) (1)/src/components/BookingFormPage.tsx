import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';

interface BookingFormPageProps {
  bookingData: {
    court: string;
    date: string;
    time: string;
    price: number;
    sport: string;
  };
  onNavigate: (page: string, data?: any) => void;
  onBack: () => void;
}

export function BookingFormPage({ bookingData, onNavigate, onBack }: BookingFormPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    teamName: '',
    findOpponent: false,
    findPlayers: false,
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      alert('Mohon lengkapi data yang wajib diisi (Nama dan Nomor WhatsApp)');
      return;
    }

    // Generate booking code
    const bookingCode = `${bookingData.sport.substring(0, 3).toUpperCase()}-${bookingData.court.slice(-1)}${new Date(bookingData.date).getDate()}${new Date(bookingData.date).getMonth() + 1}`;

    onNavigate('complete', {
      ...bookingData,
      ...formData,
      bookingCode,
    });
  };

  // Check if form is valid
  const isFormValid = formData.name.trim() !== '' && formData.phone.trim() !== '';

  return (
    <div className="min-h-screen bg-[#121212] py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          onClick={onBack}
          variant="outline"
          className="mb-6 bg-[#282828] text-white border-white/10 hover:bg-[#3E3E3E]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Beranda
        </Button>

        <div className="bg-[#181818] rounded-xl shadow-sm p-8 border border-white/10">
          <h1 className="text-white mb-6 text-3xl">
            Formulir Pemesanan
          </h1>

          {/* Booking Summary */}
          <div className="bg-[#1DB954]/10 border border-[#1DB954]/20 rounded-lg p-6 mb-8">
            <h2 className="text-white mb-4">Ringkasan Pesanan</h2>
            <div className="space-y-2">
              <p className="text-gray-300">
                <span className="text-gray-400">Anda memesan:</span> {bookingData.court}
              </p>
              <p className="text-gray-300">
                <span className="text-gray-400">Jadwal:</span> {formatDate(bookingData.date)}, {bookingData.time}
              </p>
              <p className="text-white">
                <span className="text-gray-400">Total Harga:</span> Rp{bookingData.price.toLocaleString('id-ID')}
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-white">Data Diri</h2>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">
                Nama Lengkap <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Masukkan nama lengkap Anda"
                className="bg-[#282828] border-white/10 text-white placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-300">
                Nomor WhatsApp/HP <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Contoh: 0812-3456-7890"
                className="bg-[#282828] border-white/10 text-white placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Email (opsional)
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@contoh.com"
                className="bg-[#282828] border-white/10 text-white placeholder:text-gray-500"
              />
            </div>

            {/* Open Match Options */}
            <div className="border-t border-white/10 pt-6 mt-8">
              <h2 className="text-white mb-4">Opsi Tanding</h2>
              <p className="text-gray-300 mb-4">
                Jadikan Laga Terbuka?
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="teamName" className="text-gray-300">
                    Nama Tim (opsional)
                  </Label>
                  <Input
                    id="teamName"
                    type="text"
                    value={formData.teamName}
                    onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                    placeholder="Contoh: Raja Futsal FC"
                    className="bg-[#282828] border-white/10 text-white placeholder:text-gray-500"
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="findOpponent"
                    checked={formData.findOpponent}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, findOpponent: checked as boolean })
                    }
                    className="border-white/20"
                  />
                  <div className="flex-1">
                    <label
                      htmlFor="findOpponent"
                      className="text-white cursor-pointer"
                    >
                      ✓ Ya, cari lawan tanding! (Tampilkan slot saya sebagai "CARI LAWAN")
                    </label>
                    <p className="text-sm text-gray-400 mt-1">
                      Slot Anda akan terlihat oleh tim lain yang ingin bertanding
                    </p>
                  </div>
                </div>

                {bookingData.sport === 'Badminton' && (
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="findPlayers"
                      checked={formData.findPlayers}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, findPlayers: checked as boolean })
                      }
                      className="border-white/20"
                    />
                    <div className="flex-1">
                      <label
                        htmlFor="findPlayers"
                        className="text-white cursor-pointer"
                      >
                        ✓ Ya, cari pemain tambahan!
                      </label>
                      <p className="text-sm text-gray-400 mt-1">
                        Untuk mencari partner bermain badminton
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-black py-6 rounded-full"
              disabled={!isFormValid}
            >
              Konfirmasi Booking
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}