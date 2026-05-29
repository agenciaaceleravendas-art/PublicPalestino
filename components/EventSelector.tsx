
import React from 'react';
import { Calendar, MapPin, Info, ChevronRight, Sparkles } from 'lucide-react';
import { EventData, EventInfrastructure } from '../types';
import { EVENT_DATA } from '../src/constants';

interface EventSelectorProps {
  onSelectInfrastructure: (infra: EventInfrastructure) => void;
  selectedEventId?: string;
  onSelectEvent: (eventId: string) => void;
}

export const EventSelector: React.FC<EventSelectorProps> = ({ 
  onSelectInfrastructure, 
  selectedEventId,
  onSelectEvent
}) => {
  const selectedEvent = EVENT_DATA.find(e => e.id === selectedEventId);

  return (
    <div className="max-w-5xl mx-auto mt-16 px-4">
      <div className="flex items-center gap-3 mb-8">
        <Calendar className="w-5 h-5 text-zinc-500" />
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">Eventos Programados</h3>
        <div className="flex-1 h-px bg-white/5" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Event List */}
        <div className="lg:col-span-1 space-y-4">
          {EVENT_DATA.map((event) => (
            <button
              key={event.id}
              onClick={() => onSelectEvent(event.id)}
              className={`w-full text-left p-4 rounded-2xl border transition-all group ${
                selectedEventId === event.id 
                  ? 'bg-indigo-500/10 border-indigo-500/50' 
                  : 'bg-zinc-900/50 border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                  <img 
                    src={event.image} 
                    alt={event.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`text-sm font-black uppercase tracking-tight truncate ${
                    selectedEventId === event.id ? 'text-indigo-400' : 'text-white'
                  }`}>
                    {event.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 opacity-50">
                    <MapPin className="w-3 h-3" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{event.location}</span>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 mt-1 transition-transform ${
                  selectedEventId === event.id ? 'text-indigo-500 translate-x-1' : 'text-zinc-700'
                }`} />
              </div>
            </button>
          ))}
        </div>

        {/* Event Details & Infrastructure */}
        <div className="lg:col-span-2">
          {selectedEvent ? (
            <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2 py-1 bg-zinc-800 text-zinc-400 text-[9px] font-black uppercase tracking-widest rounded">
                      {selectedEvent.date}
                    </span>
                    <span className="w-1 h-1 bg-zinc-700 rounded-full" />
                    <span className="text-zinc-500 text-[9px] font-black uppercase tracking-widest">
                      ID: {selectedEvent.id}
                    </span>
                  </div>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 italic">
                    {selectedEvent.name}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                    {selectedEvent.description}
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Info className="w-4 h-4 text-indigo-500" />
                      <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Infraestrutura Necessária</h5>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedEvent.infrastructure.map((infra, idx) => (
                        <button
                          key={idx}
                          onClick={() => onSelectInfrastructure(infra)}
                          className="group p-5 bg-zinc-900/80 border border-white/5 rounded-2xl text-left hover:border-indigo-500/30 hover:bg-zinc-800/50 transition-all"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h6 className="text-xs font-black text-white uppercase tracking-tight group-hover:text-indigo-400 transition-colors">
                              {infra.type}
                            </h6>
                            <Sparkles className="w-3 h-3 text-zinc-700 group-hover:text-indigo-500 transition-colors" />
                          </div>
                          <p className="text-[10px] text-zinc-500 font-medium leading-relaxed">
                            {infra.description}
                          </p>
                          <div className="mt-4 flex items-center gap-2 text-[9px] font-black text-indigo-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0">
                            <span>Gerar Visualização</span>
                            <ChevronRight className="w-3 h-3" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-64 aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 relative group">
                  <img 
                    src={selectedEvent.image} 
                    alt={selectedEvent.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent opacity-60" />
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] border border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-center p-12">
              <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mb-6">
                <Calendar className="w-8 h-8 text-zinc-700" />
              </div>
              <h4 className="text-sm font-black text-zinc-500 uppercase tracking-[0.2em] mb-2">Selecione um Evento</h4>
              <p className="text-xs text-zinc-600 max-w-xs leading-relaxed">
                Escolha um evento na lista ao lado para visualizar os detalhes técnicos e gerar as estruturas necessárias.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
