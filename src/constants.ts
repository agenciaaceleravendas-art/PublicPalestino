
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export const PALESTINO_EXAMPLES = [
  {
    id: 'ex-1',
    title: 'Tenda Piramidal 10x10m',
    description: 'Estrutura em aço galvanizado com lona branca premium.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800',
    prompt: 'Tenda Piramidal 10x10m Branca em estrutura de aço galvanizado, montada em gramado plano, iluminação diurna natural.'
  },
  {
    id: 'ex-2',
    title: 'Palco Modular Profissional',
    description: 'Piso em madeirite naval com guarda-corpo padrão ABNT.',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=800',
    prompt: 'Palco modular grande com piso de madeirite naval escuro, estrutura de aço visível, escadas laterais com corrimão, fundo preto.'
  },
  {
    id: 'ex-3',
    title: 'Cobertura Box Truss Q30',
    description: 'Estrutura em alumínio polido para grandes vãos.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800',
    prompt: 'Estrutura Box Truss Q30 em alumínio brilhante formando uma cobertura para evento noturno, com refletores PAR LED coloridos.'
  },
  {
    id: 'ex-4',
    title: 'Tenda Cristal (Transparente)',
    description: 'Visual sofisticado com lona cristal de alta transparência.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
    prompt: 'Tenda Cristal transparente 15x15m montada em jardim luxuoso à noite, com micro-lâmpadas decorativas (fairy lights) internas.'
  }
];

export const EVENT_DATA = [
  {
    id: 'evt-1',
    name: 'Festival de Verão 2026',
    date: '15-20 Jan 2026',
    location: 'Arena Marítima, RJ',
    description: 'O maior festival de música do litoral brasileiro, exigindo infraestrutura de palco e camarotes de alta performance.',
    image: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&q=80&w=800',
    infrastructure: [
      {
        type: 'Palco Principal',
        description: 'Palco de 24m com cobertura Box Truss Q50.',
        prompt: 'Palco principal de festival de música, 24 metros de largura, cobertura Box Truss Q50 em alumínio, sistema de som line array suspenso, iluminação profissional, Arena Marítima ao fundo.'
      },
      {
        type: 'Camarote VIP',
        description: 'Estrutura de dois andares com vista privilegiada.',
        prompt: 'Camarote VIP de dois andares para festival, estrutura metálica robusta, guarda-corpo de vidro, decoração luxuosa, vista para o palco principal.'
      }
    ]
  },
  {
    id: 'evt-2',
    name: 'Expo Agro Industrial',
    date: '10-14 Mai 2026',
    location: 'Centro de Convenções, SP',
    description: 'Feira de tecnologia agrícola com necessidade de grandes galpões estruturados e áreas de exposição.',
    image: 'https://images.unsplash.com/photo-1531050171652-59cf12d959b7?auto=format&fit=crop&q=80&w=800',
    infrastructure: [
      {
        type: 'Galpão de Exposição',
        description: 'Galpão estruturado de 2000m² sem colunas internas.',
        prompt: 'Galpão estruturado gigante para feira agrícola, 2000 metros quadrados, lona branca tensionada, sem colunas internas, portas de correr amplas, tratores em exposição.'
      },
      {
        type: 'Pórtico de Entrada',
        description: 'Estrutura de boas-vindas com painéis de LED.',
        prompt: 'Pórtico de entrada monumental para feira agro, estrutura Box Truss revestida, painéis de LED integrados, sinalização moderna, fluxo de pessoas.'
      }
    ]
  },
  {
    id: 'evt-3',
    name: 'Casamento no Campo',
    date: '22 Out 2026',
    location: 'Fazenda Santa Maria, MG',
    description: 'Evento social sofisticado que prioriza a estética e integração com a natureza.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
    infrastructure: [
      {
        type: 'Tenda Cristal',
        description: 'Tenda 15x25m com transparência total.',
        prompt: 'Tenda Cristal totalmente transparente 15x25m montada em gramado de fazenda histórica, decoração floral suspensa, lustres de cristal, pôr do sol ao fundo.'
      },
      {
        type: 'Altar Cerimonial',
        description: 'Estrutura leve em madeira e voil.',
        prompt: 'Altar para cerimônia de casamento ao ar livre, estrutura de madeira rústica com tecidos voil brancos, arranjos de flores naturais, cadeiras de madeira para convidados.'
      }
    ]
  }
];
