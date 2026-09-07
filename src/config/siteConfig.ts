export interface Specialty {
  id: string; title: string; shortDescription: string; description: string;
  image: string; imageAlt: string; indication: string; benefits: string[]; confirmed: boolean;
}
export interface Professional {
  name: string; cro: string; specialty: string; description: string; education: string[]; image: string;
}
export const siteConfig = {
  name: 'MK Odontologia Integrada', city: 'Vitória da Conquista', state: 'BA',
  address: '', whatsapp: '', instagram: '', phone: '', maps: '', hours: '',
  institutional: {
    headline: 'Odontologia integrada com atenção a você.',
    introduction: 'Atendimento odontológico em Vitória da Conquista, com orientação clara em cada etapa do tratamento.',
    aboutTitle: 'Um atendimento que começa pela escuta.',
    about: 'Na MK, a primeira conversa é sobre você. O que está incomodando, quais são suas dúvidas e o que precisa de atenção na sua saúde bucal.',
    aboutComplement: 'A partir da avaliação, a equipe conversa sobre as possibilidades de tratamento. Você entende o planejamento antes de decidir como seguir.',
    teamTitle: 'Conheça quem vai receber você.',
    team: 'A equipe avalia as necessidades de cada paciente e explica como as diferentes áreas podem contribuir para o tratamento.',
    teamComplement: 'A consulta também é um momento para perguntar. Da avaliação ao acompanhamento, queremos que você entenda o que está sendo planejado.',
  },
  specialties: [
    { id: 'implantodontia', title: 'Implantodontia', shortDescription: 'Planejamento para reabilitar o sorriso e a função dos dentes.', image: 'mk-consultorio', imageAlt: 'Consultório da MK preparado para avaliação e planejamento odontológico', confirmed: true,
      description: 'A perda de um dente pode interferir na mastigação e no sorriso. A Implantodontia avalia a possibilidade de substituí-lo com implantes e próteses, considerando a saúde bucal e as condições de cada paciente.',
      indication: 'Para quem perdeu um ou mais dentes e deseja conhecer as opções de reabilitação. A indicação depende de avaliação clínica e dos exames necessários ao planejamento.',
      benefits: ['A reabilitação busca recuperar a função dos dentes ausentes e favorecer a mastigação.', 'O planejamento considera também a harmonia do sorriso e os cuidados necessários no dia a dia.'] },
    { id: 'ortodontia', title: 'Ortodontia', shortDescription: 'Atenção ao alinhamento dos dentes e ao equilíbrio da mordida.', image: 'mk-sala-atendimento', imageAlt: 'Sala de atendimento da MK para conversar sobre o planejamento ortodôntico', confirmed: true,
      description: 'A Ortodontia avalia a posição dos dentes e como as arcadas se encaixam. Na consulta, a equipe examina a mordida e conversa sobre as alternativas de tratamento adequadas ao seu caso.',
      indication: 'Para pessoas com alterações no alinhamento dos dentes ou na mordida. A avaliação individual orienta o tipo de tratamento, o acompanhamento e sua duração.',
      benefits: ['O tratamento busca melhorar o alinhamento dos dentes e o encaixe da mordida.', 'O acompanhamento inclui orientações de higiene e cuidados com os dentes durante o processo.'] },
  ] satisfies Specialty[],
  professionals: [
    { name: '', cro: '', specialty: 'Implantodontia', description: '', education: [], image: '' },
    { name: '', cro: '', specialty: 'Ortodontia', description: '', education: [], image: '' },
  ] satisfies Professional[],
  reviews: [] as { name: string; text: string; source: string; url: string }[],
  experience: [
    { title: 'Conversa e avaliação', text: 'A consulta começa com suas dúvidas e uma avaliação da saúde bucal.' },
    { title: 'Planejamento explicado', text: 'A equipe apresenta as possibilidades e esclarece o que cada etapa envolve.' },
    { title: 'Orientação ao longo do tratamento', text: 'Você recebe informações sobre os próximos passos e os cuidados em casa.' },
  ],
  gallery: [
    { name: 'mk-recepcao', label: 'Recepção', alt: 'Recepção da MK com balcão branco e espaço para café' },
    { name: 'mk-consultorio', label: 'Consultório', alt: 'Consultório da MK com cadeira odontológica e equipamentos' },
    { name: 'mk-sala-atendimento', label: 'Sala de atendimento', alt: 'Sala de atendimento da MK com mesa e cadeiras' },
  ],
};
