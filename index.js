import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import fetch from "node-fetch";
import { formatMatch, filterMatches } from "./utils/helpers.js";

dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

// Mensagem inicial
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🤖 Bot de Gols iniciado! Estarei monitorando partidas ao vivo 24/7.");
});

// Função para buscar jogos ao vivo
async function fetchLiveMatches() {
  try {
    const response = await fetch(`https://api.football-data-api.com/live-matches?key=${process.env.FOOTBALL_API_KEY}`);
    const data = await response.json();

    if (data && data.length > 0) {
      const filtered = filterMatches(data);
      if (filtered.length > 0) {
        let message = "⚽ Jogos com tendência de gols ao vivo:\n\n";
        filtered.forEach(match => {
          message += formatMatch(match) + "\n-------------------\n";
        });
        bot.sendMessage(process.env.CHAT_ID, message);
      }
    }
  } catch (error) {
    console.error("Erro ao buscar jogos:", error);
  }
}

// Roda a cada 5 minutos
setInterval(fetchLiveMatches, 5 * 60 * 1000);
