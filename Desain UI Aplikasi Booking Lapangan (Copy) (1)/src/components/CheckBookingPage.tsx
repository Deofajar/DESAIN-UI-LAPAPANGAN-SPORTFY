import { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface CheckBookingPageProps {
  onNavigate: (page: string) => void;
}

export function CheckBookingPage({ onNavigate }: CheckBookingPageProps) {
  const [searchType, setSearchType] = useState<'code' | 'phone'>('code');
  const [searchValue, setSearchValue] = useState('');
  const [bookingResult, setBookingResult] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchValue) {
      alert('Mohon masukkan kode booking atau nomor HP');
      return;
    }

    // Mock search result
    const mockBooking = {
      bookingCode: searchType === 'code' ? searchValue : 'FSL-A2810',
      court: 'Lapangan Futsal A',
      date: '2025-10-28',
      time: '19:00 - 20:00',
      price: 150000,
      name: 'John Doe',
      phone: searchType === 'phone' ? searchValue : '0812-3456-7890',
      status: 'Terkonfirmasi',
      paymentDate: '2025-10-27 15:30',
    };

    setBookingResult(mockBooking);
  };

  const isSearchValid = searchValue.trim() !== '';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Terkonfirmasi':
        return 'bg-[#1DB954]/10 border-[#1DB954] text-[#1DB954]';
      case 'Menunggu Pembayaran':
        return 'bg-yellow-500/10 border-yellow-500 text-yellow-400';
      case 'Dibatalkan':
        return 'bg-red-500/10 border-red-500 text-red-400';
      default:
        return 'bg-gray-500/10 border-gray-500 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          onClick={() => onNavigate('home')}
          variant="outline"
          className="mb-6 bg-[#282828] text-white border-white/10 hover:bg-[#3E3E3E]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Beranda
        </Button>

        <div className="bg-[#181818] rounded-xl shadow-sm p-8 border border-white/10">
          <h1 className="text-white mb-6 text-3xl">
            Cek Booking Saya
          </h1>
          
          <p className="text-gray-300 mb-6">
            Periksa status pesanan Anda dengan memasukkan kode booking atau nomor HP yang digunakan saat booking.
          </p>

          {/* Search Type Toggle */}
          <div className="flex gap-4 mb-6">
            <Button
              onClick={() => {
                setSearchType('code');
                setSearchValue('');
                setBookingResult(null);
              }}
              variant={searchType === 'code' ? 'default' : 'outline'}
              className={searchType === 'code' ? 'bg-[#1DB954] hover:bg-[#1ed760] text-black' : 'bg-[#282828] border-white/10 text-white hover:bg-[#3E3E3E]'}
            >
              Cari dengan Kode Booking
            </Button>
            <Button
              onClick={() => {
                setSearchType('phone');
                setSearchValue('');
                setBookingResult(null);
              }}
              variant={searchType === 'phone' ? 'default' : 'outline'}
              className={searchType === 'phone' ? 'bg-[#1DB954] hover:bg-[#1ed760] text-black' : 'bg-[#282828] border-white/10 text-white hover:bg-[#3E3E3E]'}
            >
              Cari dengan Nomor HP
            </Button>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-4 mb-8">
            <div className="space-y-2">
              <Label htmlFor="search" className="text-gray-300">
                {searchType === 'code' ? 'Masukkan Kode Booking Anda' : 'Nomor HP Anda'}
              </Label>
              <Input
                id="search"
                type="text"
                required
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={searchType === 'code' ? 'Contoh: FSL-A2810' : 'Contoh: 0812-3456-7890'}
                className="bg-[#282828] border-white/10 text-white placeholder:text-gray-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-black rounded-full"
            >
              <Search className="w-4 h-4 mr-2" />
              Cek Status
            </Button>
          </form>

          {/* Search Result */}
          {bookingResult && (
            <div className="border-t border-white/10 pt-8">
              <h2 className="text-white mb-6">Hasil Pencarian</h2>

              <div className="space-y-6">
                {/* Status */}
                <div className={`border-l-4 rounded p-4 ${getStatusColor(bookingResult.status)}`}>
                  <p className="text-sm mb-1">Status Pesanan:</p>
                  <p>{bookingResult.status}</p>
                </div>

                {/* Booking Details */}
                <div className="bg-[#282828] rounded-lg p-6 space-y-4 border border-white/10">
                  <h3 className="text-white">Detail Pesanan</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Kode Booking:</p>
                      <p className="text-white">{bookingResult.bookingCode}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Status:</p>
                      <p className="text-white">{bookingResult.status}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Lapangan:</p>
                      <p className="text-white">{bookingResult.court}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Tanggal:</p>
                      <p className="text-white">{formatDate(bookingResult.date)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Waktu:</p>
                      <p className="text-white">{bookingResult.time}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Total Harga:</p>
                      <p className="text-white">Rp{bookingResult.price.toLocaleString('id-ID')}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Nama Pemesan:</p>
                      <p className="text-white">{bookingResult.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Nomor HP:</p>
                      <p className="text-white">{bookingResult.phone}</p>
                    </div>
                  </div>

                  {bookingResult.status === 'Terkonfirmasi' && (
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-gray-400 text-sm">Dikonfirmasi pada:</p>
                      <p className="text-white">{bookingResult.paymentDate}</p>
                    </div>
                  )}
                </div>

                {/* Instructions based on status */}
                {bookingResult.status === 'Menunggu Pembayaran' && (
                  <div className="bg-yellow-500/10 border-l-4 border-yellow-500 rounded p-4">
                    <p className="text-white mb-2">Pembayaran Belum Diterima</p>
                    <p className="text-gray-300 text-sm">
                      Silakan selesaikan pembayaran dan kirim bukti transfer ke WhatsApp admin: 0812-XXXX-XXXX
                    </p>
                  </div>
                )}

                {bookingResult.status === 'Terkonfirmasi' && (
                  <div className="bg-[#1DB954]/10 border-l-4 border-[#1DB954] rounded p-4">
                    <p className="text-white mb-2">Booking Terkonfirmasi! ✓</p>
                    <p className="text-gray-300 text-sm">
                      Booking Anda sudah dikonfirmasi. Silakan datang sesuai jadwal yang telah ditentukan.
                      Tunjukkan kode booking ini kepada petugas di lokasi.
                    </p>
                  </div>
                )}

                {bookingResult.status === 'Dibatalkan' && (
                  <div className="bg-red-500/10 border-l-4 border-red-500 rounded p-4">
                    <p className="text-white mb-2">Booking Dibatalkan</p>
                    <p className="text-gray-300 text-sm">
                      Pesanan ini telah dibatalkan. Untuk informasi lebih lanjut, hubungi admin di 0812-XXXX-XXXX
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}