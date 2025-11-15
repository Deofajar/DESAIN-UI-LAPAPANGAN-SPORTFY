import { ArrowLeft, Users, Clock, MapPin, Phone } from 'lucide-react';
import { Button } from './ui/button';

interface OpenMatchPageProps {
  onNavigate: (page: string) => void;
}

export function OpenMatchPage({ onNavigate }: OpenMatchPageProps) {
  const openMatches = [
    {
      id: 1,
      teamName: 'Raja Futsal FC',
      sport: 'Futsal',
      court: 'Lapangan Futsal B',
      date: '2025-10-28',
      time: '19:00 - 20:00',
      contact: '0812-3456-7890',
      skillLevel: 'Menengah',
    },
    {
      id: 2,
      teamName: 'Bulls Jakarta',
      sport: 'Basket',
      court: 'Lapangan Basket A',
      date: '2025-10-28',
      time: '18:00 - 19:00',
      contact: '0813-4567-8901',
      skillLevel: 'Pemula',
    },
    {
      id: 3,
      teamName: 'Smash Brothers',
      sport: 'Voli',
      court: 'Lapangan Voli C',
      date: '2025-10-29',
      time: '17:00 - 18:00',
      contact: '0814-5678-9012',
      skillLevel: 'Mahir',
    },
    {
      id: 4,
      teamName: 'Dribble Kings',
      sport: 'Basket',
      court: 'Lapangan Basket C',
      date: '2025-10-29',
      time: '20:00 - 21:00',
      contact: '0815-6789-0123',
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const getSportColor = (sport: string) => {
    switch (sport) {
      case 'Futsal':
        return 'bg-[#1DB954]/20 text-[#1DB954] border border-[#1DB954]/30';
      case 'Basket':
        return 'bg-orange-500/20 text-orange-400 border border-orange-500/30';
      case 'Voli':
        return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          onClick={() => onNavigate('home')}
          variant="outline"
          className="mb-6 bg-[#282828] text-white border-white/10 hover:bg-[#3E3E3E]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Beranda
        </Button>

        <div className="bg-[#181818] rounded-xl shadow-sm p-8 mb-6 border border-white/10">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h1 className="text-white mb-2 text-3xl">
                Laga Terbuka
              </h1>
              <p className="text-gray-300">
                Temukan tim yang sedang mencari lawan tanding atau pemain tambahan. 
                Hubungi mereka langsung untuk berkoordinasi!
              </p>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h3 className="text-white mb-2">💡 Cara Menggunakan Fitur Ini:</h3>
            <ol className="list-decimal list-inside space-y-1 text-gray-300">
              <li>Lihat daftar tim yang mencari lawan di bawah</li>
              <li>Pilih tim yang sesuai dengan jadwal dan olahraga Anda</li>
              <li>Klik "Hubungi Tim" untuk chat via WhatsApp</li>
              <li>Koordinasikan detail pertandingan dengan mereka</li>
            </ol>
          </div>
        </div>

        {/* Open Matches List */}
        <div className="space-y-4">
          {openMatches.map((match) => (
            <div
              key={match.id}
              className="bg-[#181818] rounded-xl shadow-sm p-6 hover:bg-[#282828] transition-all border border-white/10"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-white">{match.teamName}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs ${getSportColor(match.sport)}`}>
                      {match.sport}
                    </span>
                    {match.skillLevel && (
                      <span className="px-3 py-1 rounded-full text-xs bg-gray-500/20 text-gray-300 border border-gray-500/30">
                        {match.skillLevel}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 mb-4">
                    Sedang mencari lawan tanding!
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{match.court}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{match.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{match.contact}</span>
                    </div>
                  </div>

                  <div className="mt-2 text-sm text-gray-400">
                    📅 {formatDate(match.date)}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-white/10">
                <Button
                  onClick={() => window.open(`https://wa.me/${match.contact.replace(/[^0-9]/g, '')}`, '_blank')}
                  className="bg-[#1DB954] hover:bg-[#1ed760] text-black rounded-full"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Hubungi Tim
                </Button>
                <Button
                  onClick={() => onNavigate('schedule')}
                  variant="outline"
                  className="bg-[#282828] border-white/10 text-white hover:bg-[#3E3E3E] rounded-full"
                >
                  Lihat Jadwal Lengkap
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-8 bg-gradient-to-br from-[#1DB954]/10 to-blue-500/10 border border-[#1DB954]/20 rounded-xl p-8 text-center">
          <h2 className="text-white mb-3 text-2xl">
            Ingin Mencari Lawan?
          </h2>
          <p className="text-gray-300 mb-6">
            Booking lapangan dan centang opsi "Cari Lawan Tanding" untuk menampilkan slot Anda di halaman ini!
          </p>
          <Button
            onClick={() => onNavigate('schedule')}
            className="bg-[#1DB954] hover:bg-[#1ed760] text-black rounded-full"
          >
            Mulai Booking Sekarang
          </Button>
        </div>
      </div>
    </div>
  );
}
