import { useState } from 'react';
import { ArrowLeft, Info, Star, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

interface VenueDetailPageProps {
  venue: {
    id: string;
    name: string;
    sport: string;
    location: string;
    rating: number;
    priceFrom: number;
    image: string;
    totalCourts: number;
  };
  selectedDate: string;
  onNavigate: (page: string, data?: any) => void;
  onBack: () => void;
}

interface OpenMatch {
  courtId: string;
  timeSlot: string;
  teamName: string;
  sport: string;
  contact: string;
  skillLevel?: string;
}

export function VenueDetailPage({ venue, selectedDate, onNavigate, onBack }: VenueDetailPageProps) {
  const [selectedSlot, setSelectedSlot] = useState<{court: string, time: string, price: number, sport: string} | null>(null);
  const [openMatchDialog, setOpenMatchDialog] = useState<OpenMatch | null>(null);

  // Mock data for open matches
  const openMatches: OpenMatch[] = [
    {
      courtId: 'Lapangan Futsal B',
      timeSlot: '19:00 - 20:00',
      teamName: 'Raja Futsal FC',
      sport: 'Futsal',
      contact: '0812-3456-7890',
      skillLevel: 'Menengah',
    },
    {
      courtId: 'Lapangan Basket A',
      timeSlot: '18:00 - 19:00',
      teamName: 'Bulls Jakarta',
      sport: 'Basket',
      contact: '0813-4567-8901',
    },
  ];

  const timeSlots = [
    '08:00 - 09:00',
    '09:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
    '17:00 - 18:00',
    '18:00 - 19:00',
    '19:00 - 20:00',
    '20:00 - 21:00',
    '21:00 - 22:00',
  ];

  // Generate courts based on venue type
  const generateCourts = () => {
    const courts = [];
    const sportPrefix = venue.sport === 'Futsal' ? 'Futsal' : venue.sport === 'Voli' ? 'Voli' : 'Basket';
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    
    for (let i = 0; i < venue.totalCourts; i++) {
      courts.push({
        id: `Lapangan ${sportPrefix} ${letters[i]}`,
        sport: venue.sport,
        price: venue.priceFrom,
      });
    }
    
    return courts;
  };

  const courts = generateCourts();

  const getSlotStatus = (courtId: string, timeSlot: string) => {
    // Mock logic for slot status
    const random = Math.random();
    
    // Check if it's an open match
    const openMatch = openMatches.find(
      m => m.courtId === courtId && m.timeSlot === timeSlot
    );
    if (openMatch) return { type: 'open-match', data: openMatch };
    
    // Random distribution
    if (timeSlot === '12:00 - 13:00') return { type: 'closed' };
    if (random < 0.3) return { type: 'booked' };
    return { type: 'available' };
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const handleSlotClick = (court: string, time: string, status: any, price: number, sport: string) => {
    if (status.type === 'available') {
      setSelectedSlot({ court, time, price, sport });
    } else if (status.type === 'open-match') {
      setOpenMatchDialog(status.data);
    }
  };

  const handleBooking = () => {
    if (selectedSlot) {
      onNavigate('booking', {
        court: selectedSlot.court,
        date: selectedDate,
        time: selectedSlot.time,
        price: selectedSlot.price,
        sport: selectedSlot.sport,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          onClick={onBack}
          variant="outline"
          className="mb-6 bg-[#282828] text-white border-white/10 hover:bg-[#3E3E3E]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Daftar Venue
        </Button>

        {/* Venue Info */}
        <div className="bg-[#181818] rounded-xl shadow-sm p-6 mb-6 border border-white/10">
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <h1 className="text-white mb-2 text-3xl">
                {venue.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-[#1DB954] text-[#1DB954]" />
                  <span className="text-white">{venue.rating}</span>
                </div>
                <span className="text-gray-500">•</span>
                <div className="flex items-center gap-1 text-gray-300">
                  <MapPin className="w-4 h-4" />
                  <span>{venue.location}</span>
                </div>
                <span className="text-gray-500">•</span>
                <span className="text-gray-300">{venue.totalCourts} Lapangan {venue.sport}</span>
              </div>
              <p className="text-gray-300">
                Jadwal untuk {formatDate(selectedDate)}
              </p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-[#181818] rounded-xl shadow-sm p-6 mb-6 border border-white/10">
          <h3 className="text-white mb-4">Keterangan:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#1DB954] rounded"></div>
              <span className="text-gray-300">Tersedia</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-500 rounded"></div>
              <span className="text-gray-300">Sudah Dipesan</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-500 rounded"></div>
              <span className="text-gray-300">Ditutup</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-orange-500 rounded"></div>
              <span className="text-gray-300">Cari Lawan</span>
            </div>
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="bg-[#181818] rounded-xl shadow-sm p-6 overflow-x-auto border border-white/10">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr>
                <th className="border border-white/10 bg-[#282828] p-3 text-left text-white">
                  Waktu
                </th>
                {courts.map((court) => (
                  <th key={court.id} className="border border-white/10 bg-[#282828] p-3 text-center text-white min-w-[140px]">
                    <div>{court.id}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((time) => (
                <tr key={time}>
                  <td className="border border-white/10 p-3 text-white bg-[#181818]">
                    {time}
                  </td>
                  {courts.map((court) => {
                    const status = getSlotStatus(court.id, time);
                    const isSelected = selectedSlot?.court === court.id && selectedSlot?.time === time;
                    
                    return (
                      <td key={`${court.id}-${time}`} className="border border-white/10 p-2 bg-[#181818]">
                        <button
                          onClick={() => handleSlotClick(court.id, time, status, court.price, court.sport)}
                          disabled={status.type === 'booked' || status.type === 'closed'}
                          className={`w-full p-3 rounded-lg transition-all ${
                            status.type === 'available'
                              ? isSelected
                                ? 'bg-blue-500 text-white cursor-pointer'
                                : 'bg-[#1DB954] text-black hover:bg-[#1ed760] cursor-pointer'
                              : status.type === 'booked'
                              ? 'bg-red-500 text-white cursor-not-allowed'
                              : status.type === 'closed'
                              ? 'bg-gray-600 text-white cursor-not-allowed'
                              : 'bg-orange-500 text-white hover:bg-orange-600 cursor-pointer'
                          }`}
                        >
                          <div className="text-xs">
                            {status.type === 'available' && `Tersedia`}
                            {status.type === 'booked' && 'Sudah Dipesan'}
                            {status.type === 'closed' && 'Ditutup'}
                            {status.type === 'open-match' && 'CARI LAWAN'}
                          </div>
                          {status.type === 'available' && (
                            <div className="text-xs mt-1">
                              Rp{court.price.toLocaleString('id-ID')}
                            </div>
                          )}
                          {status.type === 'open-match' && (
                            <div className="text-xs mt-1 flex items-center justify-center gap-1">
                              <Info className="w-3 h-3" />
                              Lihat
                            </div>
                          )}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedSlot && (
          <div className="fixed bottom-0 left-0 right-0 bg-[#181818] border-t border-white/10 shadow-lg p-6 z-40">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div>
                <p className="text-gray-400">Slot dipilih:</p>
                <p className="text-white">
                  {selectedSlot.court} - {selectedSlot.time}
                </p>
                <p className="text-[#1DB954]">
                  Rp{selectedSlot.price.toLocaleString('id-ID')}
                </p>
              </div>
              <Button
                onClick={handleBooking}
                className="bg-[#1DB954] hover:bg-[#1ed760] text-black px-8 rounded-full"
              >
                Lanjut ke Pemesanan
              </Button>
            </div>
          </div>
        )}

        {/* Open Match Dialog */}
        <Dialog open={!!openMatchDialog} onOpenChange={() => setOpenMatchDialog(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Laga Terbuka - Cari Lawan</DialogTitle>
              <DialogDescription>
                Tim ini sedang mencari lawan tanding
              </DialogDescription>
            </DialogHeader>
            
            {openMatchDialog && (
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">Nama Tim:</p>
                  <p className="text-gray-900">{openMatchDialog.teamName}</p>
                </div>
                
                <div>
                  <p className="text-gray-600">Olahraga:</p>
                  <p className="text-gray-900">{openMatchDialog.sport}</p>
                </div>
                
                {openMatchDialog.skillLevel && (
                  <div>
                    <p className="text-gray-600">Level Skill:</p>
                    <p className="text-gray-900">{openMatchDialog.skillLevel}</p>
                  </div>
                )}
                
                <div>
                  <p className="text-gray-600">Jadwal:</p>
                  <p className="text-gray-900">
                    {openMatchDialog.courtId} - {openMatchDialog.timeSlot}
                  </p>
                </div>
                
                <div>
                  <p className="text-gray-600">Kontak:</p>
                  <p className="text-gray-900">{openMatchDialog.contact}</p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => window.open(`https://wa.me/${openMatchDialog.contact.replace(/[^0-9]/g, '')}`, '_blank')}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    Hubungi Tim
                  </Button>
                  <Button
                    onClick={() => setOpenMatchDialog(null)}
                    variant="outline"
                    className="flex-1"
                  >
                    Tutup
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
