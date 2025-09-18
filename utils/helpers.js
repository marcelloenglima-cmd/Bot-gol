export function formatMatch(match) {
  return `🏟️ ${match.home_name} x ${match.away_name}
⏱️ Minuto: ${match.minute}
🔢 Placar: ${match.home_score} - ${match.away_score}`;
}

export function filterMatches(matches) {
  return matches.filter(m => 
    (m.home_score + m.away_score) >= 2 || m.minute > 70
  );
}
