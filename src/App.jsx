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
        { texto: "🎨 Expressar minha essência através da arte ou decoração.", tipo: "criativa" },
        { texto: "📊 Organizar minhas metas e traçar planos claros de ação.", tipo: "estrategista" },
        { texto: "🌿 Cuidar das pessoas que amo ou do meu lar com carinho.", tipo: "protetora" }
      ]
    },
    {
      titulo: "Diante de um desafio, qual sua primeira reação?",
      opcoes: [
        { texto: "✨ Buscar uma solução inovadora e fora da caixa.", tipo: "criativa" },
        { texto: "⚖️ Analisar os fatos e traçar uma estratégia lógica.", tipo: "estrategista" },
        { texto: "🤝 Pensar em como isso afeta as relações e o bem-estar coletivo.", tipo: "protetora" }
      ]
    },
    {
      titulo: "Qual dessas palavras melhor define sua força?",
      opcoes: [
        { texto: "Inovação", tipo: "criativa" },
        { texto: "Liderança", tipo: "estrategista" },
        { texto: "Cuidado", tipo: "protetora" }
      ]
    }
  ];

  const resultados = {
    criativa: { 
      nome: "A Criativa", 
      emoji: "🎨", 
      desc: "Sua alma é artística e inspiradora. Você transforma o mundo ao seu redor com beleza, originalidade e sensibilidade única."
    },
    estrategista: { 
      nome: "A Estrategista", 
      emoji: "🎯", 
      desc: "Você é uma líder nata. Seu foco, disciplina e visão de futuro transformam sonhos ousados em planos concretos e realidade."
    },
    protetora: { 
      nome: "A Protetora", 
      emoji: "🌿", 
      desc: "Seu coração é um refúgio. Você nutre, acolhe e fortalece as relações, criando laços profundos de amor, confiança e bem-estar."
    }
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

  // Link para compartilhar no WhatsApp
  const mensagem = `Fiz o Quiz da Alana! Meu arquétipo é ${perfilFinal.nome} ${perfilFinal.emoji}. Descubra o seu: https://descubra-seu-arquetipo.vercel.app/`;
  const urlWhatsapp = `https://wa.me/?text=${encodeURIComponent(mensagem)}`;

  return (
    <div className="tela-cheia">
      
      {tela === 'inicio' && (
        <div className="cartao">
          <span style={{fontSize: '3.5rem', marginBottom: '15px', display: 'block'}}>✨</span>
          <h1 className="titulo-principal">Guia dos Arquétipos</h1>
          <p className="texto-cinza">Descubra a energia que guia sua essência e seu estilo com a consultoria da Lilly.</p>
          <button className="botao-rosa" onClick={() => setTela('quiz')}>Iniciar Jornada</button>
        </div>
      )}

      {tela === 'quiz' && (
        <div className="cartao">
          <div className="barra-container">
            <div className="barra-preenchida" style={{ width: `${((perguntaAtual + 1) / perguntas.length) * 100}%` }}></div>
          </div>
          <h2 style={{color: '#374151', margin: '20px 0', fontSize: '1.4rem'}}>{perguntas[perguntaAtual].titulo}</h2>
          <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
            {perguntas[perguntaAtual].opcoes.map((opcao, i) => (
              <button key={i} className="botao-rosa" style={{backgroundColor: '#fff', color: '#be185d', border: '1px solid #fce7f3', textAlign: 'left'}} onClick={() => responder(opcao.tipo)}>
                {opcao.texto}
              </button>
            ))}
          </div>
        </div>
      )}

      {tela === 'resultado' && (
        <div className="cartao">
          <span className="resultado-emoji">{perfilFinal.emoji}</span>
          <h1 className="resultado-titulo">{perfilFinal.nome}</h1>
          <div className="divider"></div>
          <p className="texto-cinza">{perfilFinal.desc}</p>
          <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px'}}>
            <a href={urlWhatsapp} target="_blank" className="botao-whatsapp">Compartilhar Resultado</a>
            <button className="botao-rosa" style={{background: '#f3f4f6', color: '#4b5563'}} onClick={() => window.location.reload()}>Refazer</button>
          </div>
        </div>
      )}

    </div>
  )
}

export default App