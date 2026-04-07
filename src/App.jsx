import { useState } from 'react'
import './App.css'

function App() {
  const [tela, setTela] = useState('inicio');
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [pontos, setPontos] = useState({ criativa: 0, estrategista: 0, protetora: 0 });

  const perguntas = [
    {
      titulo: "Qual dessas atividades mais renova sua energia?",
      opcoes: [
        { texto: "🎨 Criar algo novo ou decorar um espaço", tipo: "criativa" },
        { texto: "📊 Organizar planos e definir metas", tipo: "estrategista" },
        { texto: "🌿 Cuidar de pessoas ou do ambiente", tipo: "protetora" }
      ]
    },
    {
      titulo: "Como você toma decisões importantes?",
      opcoes: [
        { texto: "✨ Sigo minha intuição e inspiração", tipo: "criativa" },
        { texto: "⚖️ Analiso os fatos e a lógica", tipo: "estrategista" },
        { texto: "🤝 Penso no bem-estar de todos", tipo: "protetora" }
      ]
    },
    {
      titulo: "Qual presente você mais gostaria de ganhar?",
      opcoes: [
        { texto: "📸 Algo artesanal e exclusivo", tipo: "criativa" },
        { texto: "🎯 Um planner ou curso de negócios", tipo: "estrategista" },
        { texto: "🕯️ Um kit de autocuidado relaxante", tipo: "protetora" }
      ]
    }
  ];

  const resultados = {
    criativa: { nome: "A Criativa", emoji: "🎨", desc: "Sua essência é transformar o comum em extraordinário através da arte e da sensibilidade." },
    estrategista: { nome: "A Estrategista", emoji: "🎯", desc: "Você nasceu para liderar e transformar objetivos em realidade com foco e disciplina." },
    protetora: { nome: "A Protetora", emoji: "🌿", desc: "Sua força está no acolhimento e na capacidade de nutrir relações e sonhos com carinho." }
  };

  const responder = (tipo) => {
    const novosPontos = { ...pontos, [tipo]: pontos[tipo] + 1 };
    setPontos(novosPontos);
    if (perguntaAtual + 1 < perguntas.length) {
      setPerguntaAtual(perguntaAtual + 1);
    } else {
      setTela('resultado');
    }
  };

  const vencedor = Object.keys(pontos).reduce((a, b) => pontos[a] > pontos[b] ? a : b);
  const progresso = ((perguntaAtual) / perguntas.length) * 100;

  return (
    <div className="tela-cheia">
      
      {tela === 'inicio' && (
        <div className="cartao">
          <span style={{fontSize: '3rem'}}>✨</span>
          <h1 className="titulo-principal">Descubra Seu Arquétipo</h1>
          <p className="texto-cinza">Uma jornada visual e intuitiva para revelar a energia que guia sua essência.</p>
          <button className="botao-rosa" onClick={() => setTela('quiz')}>Começar Jornada</button>
        </div>
      )}

      {tela === 'quiz' && (
        <div className="cartao">
          {/* Barra de Progresso */}
          <div className="barra-container">
            <div className="barra-preenchida" style={{ width: `${((perguntaAtual + 1) / perguntas.length) * 100}%` }}></div>
          </div>
          
          <span style={{color: '#be185d', fontWeight: 'bold', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px'}}>
            Etapa {perguntaAtual + 1} de {perguntas.length}
          </span>
          
          <h2 style={{color: '#374151', margin: '20px 0', fontSize: '1.4rem', lineHeight: '1.3'}}>
            {perguntas[perguntaAtual].titulo}
          </h2>
          
          <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
            {perguntas[perguntaAtual].opcoes.map((opcao, index) => (
              <button 
                key={index} 
                className="botao-rosa" 
                style={{backgroundColor: '#fff', color: '#be185d', border: '2px solid #fce7f3', textAlign: 'left', padding: '15px'}} 
                onClick={() => responder(opcao.tipo)}
              >
                {opcao.texto}
              </button>
            ))}
          </div>
        </div>
      )}

      {tela === 'resultado' && (
        <div className="cartao">
          <span style={{fontSize: '4rem'}}>{resultados[vencedor].emoji}</span>
          <h1 className="titulo-principal" style={{marginTop: '10px'}}>{resultados[vencedor].nome}</h1>
          <p className="texto-cinza" style={{fontSize: '1.1rem', fontWeight: '500'}}>{resultados[vencedor].desc}</p>
          <button className="botao-rosa" onClick={() => window.location.reload()}>Refazer Teste</button>
        </div>
      )}

    </div>
  )
}

export default App