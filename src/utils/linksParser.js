// Utility to parse sample links from /links.txt or fallback file

const fallbackData = {
  videoEdits: [
    {
      id: 'video-1',
      title: 'Artisanal Coffee Commercial Ad',
      category: 'Commercial Ads',
      youtubeId: 'tIyLS4uGsts',
      url: 'https://youtube.com/shorts/tIyLS4uGsts?feature=share',
      embedUrl: 'https://www.youtube.com/embed/tIyLS4uGsts',
      tags: ['Product Ad', 'Fast Pacing', 'Sound Design'],
      description: 'High-impact product commercial with rhythmic sound effects, punchy transitions, and color enhancement.',
      aspectRatio: '9:16'
    },
    {
      id: 'video-2',
      title: 'High-Retention Podcast Short',
      category: 'Podcasts',
      youtubeId: 'yuqc8UF-jHk',
      url: 'https://youtube.com/shorts/yuqc8UF-jHk?feature=share',
      embedUrl: 'https://www.youtube.com/embed/yuqc8UF-jHk',
      tags: ['Dynamic Subtitles', 'Hook Strategy', 'B-Roll Pops'],
      description: 'Short-form conversational podcast cut featuring eye-catching animated captions, zoom punches, and visual hooks.',
      aspectRatio: '9:16'
    },
    {
      id: 'video-3',
      title: 'Motion Explainer Reel',
      category: 'Explainer Reels',
      youtubeId: 'mp7ESEZrQPI',
      url: 'https://youtube.com/shorts/mp7ESEZrQPI?feature=share',
      embedUrl: 'https://www.youtube.com/embed/mp7ESEZrQPI',
      tags: ['Motion Graphics', 'Info Hierarchy', 'Retention Editing'],
      description: 'Educational explainer reel engineered to retain attention with animated graphics, kinetic text, and seamless soundscapes.',
      aspectRatio: '9:16'
    },
    {
      id: 'video-4',
      title: 'Cinematic Lifestyle Vlog Reel',
      category: 'Vlogs',
      youtubeId: 'vLFxo2ftnok',
      url: 'https://youtube.com/shorts/vLFxo2ftnok?feature=share',
      embedUrl: 'https://www.youtube.com/embed/vLFxo2ftnok',
      tags: ['Cinematic Pacing', 'Color Grade', 'Atmospheric Beat'],
      description: 'Aesthetic visual diary with smooth speed ramps, warm film tones, and immersive ambient audio layering.',
      aspectRatio: '9:16'
    }
  ],
  voiceOvers: [
    {
      id: 'vo-1',
      title: 'Hindi Emotional & Expressive Narration',
      language: 'Hindi',
      category: 'Narration & Storytelling',
      url: 'https://soundcloud.com/daisuke-801945923/hindi-samples',
      embedUrl: 'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/daisuke-801945923/hindi-samples&color=%23d4af37&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false',
      tags: ['Hindi', 'Deep & Warm', 'Storytelling', 'Spoken Word'],
      description: 'Rich, natural Hindi vocal delivery crafted for soulful narratives, poetry recitations, and storytelling formats.',
      tone: 'Soulful, Empathetic, Resonant'
    },
    {
      id: 'vo-2',
      title: 'Hindi Cinematic Narration',
      language: 'Hindi',
      category: 'Narration & Storytelling',
      url: 'https://soundcloud.com/daisuke-801945923/hindi-narration',
      embedUrl: 'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/daisuke-801945923/hindi-narration&color=%23d4af37&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false',
      tags: ['Hindi', 'Cinematic', 'Narration', 'Expressive'],
      description: 'Dramatic cinematic Hindi narration with deep tonal presence, crafted for film, documentary, and brand storytelling.',
      tone: 'Deep, Dramatic, Cinematic'
    },
    {
      id: 'vo-3',
      title: 'English Coffee Ad Commercial',
      language: 'English',
      category: 'Commercial & Brand',
      url: 'https://soundcloud.com/daisuke-801945923/coffee-ad-sample',
      embedUrl: 'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/daisuke-801945923/coffee-ad-sample&color=%23d4af37&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false',
      tags: ['English', 'Smooth & Confident', 'Commercial Ads', 'Punchy'],
      description: 'Polished, crisp, and persuasive English voiceover styled for consumer brands, product promos, and modern digital ads.',
      tone: 'Conversational, Energetic, Crisp'
    },
    {
      id: 'vo-4',
      title: 'English Cinematic Character Dubbing',
      language: 'English',
      category: 'Dubbing & Character',
      url: 'https://soundcloud.com/daisuke-801945923/dubbing-eng',
      embedUrl: 'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/daisuke-801945923/dubbing-eng&color=%23d4af37&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false',
      tags: ['English', 'Dramatic Dubbing', 'Character Acting', 'Audio Sync'],
      description: 'Expressive vocal performance suited for character animation, film dubbing, game voice acting, and dialogue delivery.',
      tone: 'Dramatic, Dynamic, Character-Driven'
    }
  ]
};

// Helper to extract YouTube ID from shorts or standard link
function extractYouTubeId(url) {
  const shortsMatch = url.match(/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch) return shortsMatch[1];
  const watchMatch = url.match(/v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) return watchMatch[1];
  const youtuBeMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (youtuBeMatch) return youtuBeMatch[1];
  return null;
}

// Split a raw line like "Coffee Ad sample - https://..." into [name, url]
// Splits ONLY on the LAST occurrence of " - https://" to avoid breaking hyphenated URLs
function splitNameAndUrl(line) {
  // Find " - https://" or " - http://"
  const separatorRegex = / - (https?:\/\/)/;
  const match = separatorRegex.exec(line);
  if (!match) return [line.trim(), ''];
  const name = line.slice(0, match.index).trim();
  const url = line.slice(match.index + 3).trim(); // +3 to skip " - "
  return [name, url];
}

// Helper to format title nicely
function formatTitle(rawName) {
  return rawName
    .replace(/\bsample\b/gi, '')
    .replace(/\bvlod\b/gi, 'Vlog')
    .replace(/[-_]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// Build a SoundCloud embed URL from a raw SoundCloud URL
function buildSoundCloudEmbed(url) {
  // Encode only the URL portion (not the whole string)
  const encodedUrl = encodeURIComponent(url);
  return `https://w.soundcloud.com/player/?url=${encodedUrl}&color=%23d4af37&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false`;
}

export async function fetchSampleLinks() {
  try {
    let response = await fetch('/links.txt');
    if (!response.ok) {
      response = await fetch('/Video edit and VO Samples.txt');
    }
    if (!response.ok) {
      return fallbackData;
    }

    const text = await response.text();
    const lines = text.split('\n');

    let currentSection = null;
    const parsedVideos = [];
    const parsedVoiceovers = [];

    for (let rawLine of lines) {
      const line = rawLine.trim();
      if (!line) continue;

      // Section headers (no link in these)
      if (!line.includes('http')) {
        if (line.toLowerCase().includes('video edit')) {
          currentSection = 'video';
        } else if (line.toLowerCase().includes('voice over') || line.toLowerCase().includes('voiceover')) {
          currentSection = 'voice';
        }
        continue;
      }

      // Split correctly on " - https://" so hyphens in URLs are preserved
      const [name, url] = splitNameAndUrl(line);
      if (!url) continue;

      if (currentSection === 'video') {
        const ytId = extractYouTubeId(url);
        const lowerName = name.toLowerCase();

        let category = 'Commercial Ads';
        if (lowerName.includes('podcast')) category = 'Podcasts';
        else if (lowerName.includes('explainer')) category = 'Explainer Reels';
        else if (lowerName.includes('vlod') || lowerName.includes('vlog')) category = 'Vlogs';

        // Match enriched metadata by YouTube ID only — never by language
        const existing = fallbackData.videoEdits.find(v => v.youtubeId === ytId);

        parsedVideos.push({
          id: `video-${parsedVideos.length + 1}`,
          title: existing ? existing.title : formatTitle(name),
          category: existing ? existing.category : category,
          youtubeId: ytId,
          url,
          embedUrl: ytId ? `https://www.youtube.com/embed/${ytId}` : url,
          tags: existing ? existing.tags : [category, 'Vertical Reel', 'Shorts'],
          description: existing ? existing.description : 'High-impact editing with clean cuts, sound design, and motion polish.',
          aspectRatio: '9:16'
        });

      } else if (currentSection === 'voice') {
        const lowerName = name.toLowerCase();
        const isHindi = lowerName.includes('hindi');
        const language = isHindi ? 'Hindi' : 'English';

        let category = 'Commercial & Brand';
        if (lowerName.includes('dubbing')) category = 'Dubbing & Character';
        else if (isHindi) category = 'Narration & Storytelling';

        const embedUrl = buildSoundCloudEmbed(url);

        // Match enriched metadata by exact URL — prevents merging different tracks
        const existing = fallbackData.voiceOvers.find(v => v.url === url);

        parsedVoiceovers.push({
          id: `vo-${parsedVoiceovers.length + 1}`,
          title: existing ? existing.title : formatTitle(name),
          language,
          category: existing ? existing.category : category,
          url,
          embedUrl,
          tags: existing ? existing.tags : [language, category, 'Voiceover'],
          description: existing ? existing.description : 'Professional vocal delivery recorded with studio precision.',
          tone: existing ? existing.tone : 'Clear, expressive, and versatile'
        });
      }
    }

    if (parsedVideos.length === 0 && parsedVoiceovers.length === 0) {
      return fallbackData;
    }

    return {
      videoEdits: parsedVideos.length > 0 ? parsedVideos : fallbackData.videoEdits,
      voiceOvers: parsedVoiceovers.length > 0 ? parsedVoiceovers : fallbackData.voiceOvers
    };
  } catch (error) {
    console.warn('Using fallback sample data due to fetch error:', error);
    return fallbackData;
  }
}

export { fallbackData };
