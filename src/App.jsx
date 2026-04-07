import { useState } from 'react'
import './App.css'

function App() {
  const [tela, setTela] = useState('inicio');
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [pontos, setPontos] = useState({ criativa: 0, estrategista: 0, protetora: 0 });

  const perguntas = [
    {
      titulo: "O que mais renova sua energia e te traz paz?",
      opcoes: [
        { texto: "🎨 Expressar minha essência através da arte", tipo: "criativa" },
        { texto: "📊 Organizar minhas metas e planos", tipo: "estrategista" },
        { texto: "🌿 Cuidar das pessoas e do meu lar", tipo: "protetora" }
      ]
    },
    {
      titulo: "Diante de um desafio, qual sua reação?",
      opcoes: [
        { texto: "✨ Buscar uma solução inovadora", tipo: "criativa" },
        { texto: "⚖️ Analisar os fatos e traçar uma lógica", tipo: "estrategista" },
        { texto: "🤝 Pensar no bem-estar coletivo", tipo: "protetora" }
      ]
    },
    {
      titulo: "Qual palavra melhor define sua força?",
      opcoes: [
        { texto: "Inovação", tipo: "criativa" },
        { texto: "Liderança", tipo: "estrategista" },
        { texto: "Cuidado", tipo: "protetora" }
      ]
    }
  ];

  const resultados = {
    criativa: { nome: "A Criativa", emoji: "🎨", desc: "Sua alma é inspiradora e você transforma o mundo com sua sensibilidade única." },
    estrategista: { nome: "A Estrategista", emoji: "🎯", desc: "Você é uma líder nata, com foco e visão para transformar sonhos em planos reais." },
    protetora: { nome: "A Protetora", emoji: "🌿", desc: "Seu coração é um refúgio. Você nutre e fortalece os laços com amor e confiança." }
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
  const perfilFinal = resultados[vencedor];
  const urlWa = `https://wa.me/?text=${encodeURIComponent(`Meu Arquétipo é ${perfilFinal.nome}! Descubra o seu: https://descubra-seu-arquetipo.vercel.app/`)}`;

  return (
    <div className="tela-cheia">
      {tela === 'inicio' && (
        <div className="cartao">
          <span style={{fontSize: '3.5rem', display: 'block', marginBottom: '10px'}}>✨</span>
          <h1 className="titulo-principal">Guia de Arquétipos</h1>
          <p className="texto-cinza">Descubra a energia que guia sua essência com a consultoria da Lilly.</p>
          <button className="botao-rosa" onClick={() => setTela('quiz')}>Iniciar Teste</button>
        </div>
      )}

      {tela === 'quiz' && (
        <div className="cartao">
          <div className="barra-container">
            <div className="barra-preenchida" style={{ width: `${((perguntaAtual + 1) / perguntas.length) * 100}%` }}></div>
          </div>
          <h2 className="texto-cinza" style={{fontWeight: '700', color: '#1f2937', marginBottom: '20px'}}>
            {perguntas[perguntaAtual].titulo}
          </h2>
          <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
            {perguntas[perguntaAtual].opcoes.map((opt, i) => (
              <button key={i} className="botao-rosa" onClick={() => responder(opt.tipo)}>
                {opt.texto}
              </button>
            ))}
          </div>
        </div>
      )}

      {tela === 'resultado' && (
        <div className="cartao">
          <span style={{fontSize: '4.5rem', display: 'block', marginBottom: '15px'}}>{perfilFinal.emoji}</span>
          <h1 className="titulo-principal" style={{color: '#be185d'}}>{perfilFinal.nome}</h1>
          <p className="texto-cinza">{perfilFinal.desc}</p>
          <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
            <a href={urlWa} target="_blank" className="botao-rosa" style={{background: '#25D366', textDecoration: 'none'}}>
              Enviar no WhatsApp
            </a>
            <button className="botao-rosa" style={{background: '#e5e7eb', color: '#4b5563'}} onClick={() => window.location.reload()}>
              Refazer
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App