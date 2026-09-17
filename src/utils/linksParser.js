// Utility to parse sample links from /samples.json

// ─── Enrichment metadata ─────────────────────────────────────────────────────
// When a known URL or YouTube ID is found, we apply richer titles, tags, etc.
// Otherwise we auto-generate them from the raw JSON entry.

const enrichments = {
  video: {
    tIyLS4uGsts: {
      title: 'Artisanal Coffee Commercial Ad',
      tags: ['Product Ad', 'Fast Pacing', 'Sound Design'],
      description: 'High-impact product commercial with rhythmic sound effects, punchy transitions, and color enhancement.'
    },
    yuqc8UF8jHk: {
      title: 'High-Retention Podcast Short',
      tags: ['Dynamic Subtitles', 'Hook Strategy', 'B-Roll Pops'],
      description: 'Short-form conversational podcast cut featuring eye-catching animated captions, zoom punches, and visual hooks.'
    },
    mp7ESEZrQPI: {
      title: 'Motion Explainer Reel',
      tags: ['Motion Graphics', 'Info Hierarchy', 'Retention Editing'],
      description: 'Educational explainer reel engineered to retain attention with animated graphics, kinetic text, and seamless soundscapes.'
    },
    vLFxo2ftnok: {
      title: 'Cinematic Lifestyle Vlog Reel',
      tags: ['Cinematic Pacing', 'Color Grade', 'Atmospheric Beat'],
      description: 'Aesthetic visual diary with smooth speed ramps, warm film tones, and immersive ambient audio layering.'
    }
  },
  voiceover: {
    'https://soundcloud.com/daisuke-801945923/hindi-samples': {
      title: 'Hindi Emotional & Expressive Narration',
      tags: ['Hindi', 'Deep & Warm', 'Storytelling', 'Spoken Word'],
      description: 'Rich, natural Hindi vocal delivery crafted for soulful narratives, poetry recitations, and storytelling formats.',
      tone: 'Soulful, Empathetic, Resonant'
    },
    'https://soundcloud.com/daisuke-801945923/hindi-narration': {
      title: 'Hindi Cinematic Narration',
      tags: ['Hindi', 'Cinematic', 'Narration', 'Expressive'],
      description: 'Dramatic cinematic Hindi narration with deep tonal presence, crafted for film, documentary, and brand storytelling.',
      tone: 'Deep, Dramatic, Cinematic'
    },
    'https://soundcloud.com/daisuke-801945923/coffee-ad-sample': {
      title: 'English Coffee Ad Commercial',
      tags: ['English', 'Smooth & Confident', 'Commercial Ads', 'Punchy'],
      description: 'Polished, crisp, and persuasive English voiceover styled for consumer brands, product promos, and modern digital ads.',
      tone: 'Conversational, Energetic, Crisp'
    },
    'https://soundcloud.com/daisuke-801945923/dubbing-eng': {
      title: 'English Cinematic Character Dubbing',
      tags: ['English', 'Dramatic Dubbing', 'Character Acting', 'Audio Sync'],
      description: 'Expressive vocal performance suited for character animation, film dubbing, game voice acting, and dialogue delivery.',
      tone: 'Dramatic, Dynamic, Character-Driven'
    }
  }
};

// ─── helpers ─────────────────────────────────────────────────────────────────

function extractYouTubeId(url) {
  const shortsMatch = url.match(/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch) return shortsMatch[1];
  const watchMatch = url.match(/v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) return watchMatch[1];
  const youtuBeMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (youtuBeMatch) return youtuBeMatch[1];
  return null;
}

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

function buildSoundCloudEmbed(url) {
  const encodedUrl = encodeURIComponent(url);
  return `https://w.soundcloud.com/player/?url=${encodedUrl}&color=%23d4af37&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false`;
}

function inferVideoCategory(title, category) {
  const lower = title.toLowerCase();
  if (category === 'shorts_reels') {
    if (lower.includes('podcast')) return 'Podcasts';
    if (lower.includes('explainer')) return 'Explainer Reels';
    if (lower.includes('vlog') || lower.includes('vlod')) return 'Vlogs';
    if (lower.includes('music')) return 'Music Videos';
    return 'Commercial Ads';
  }
  // Long videos
  if (lower.includes('podcast')) return 'Podcasts';
  if (lower.includes('documentary') || lower.includes('doc')) return 'Documentary';
  if (lower.includes('music')) return 'Music Videos';
  return 'Long Form';
}

// ─── main fetch ──────────────────────────────────────────────────────────────

export async function fetchSampleLinks() {
  try {
    const response = await fetch('/samples.json');
    if (!response.ok) throw new Error('samples.json not found');

    const json = await response.json();

    // --- Parse video edits ---
    const parsedVideos = [];

    for (const [category, items] of Object.entries(json.videoEdits || {})) {
      for (const entry of items) {
        const ytId = extractYouTubeId(entry.url);
        const enrich = ytId && enrichments.video[ytId];
        const aspectRatio = category === 'shorts_reels' ? '9:16' : '16:9';
        const inferredCategory = inferVideoCategory(entry.title, category);

        parsedVideos.push({
          id: `video-${parsedVideos.length + 1}`,
          title: enrich ? enrich.title : formatTitle(entry.title),
          category: inferredCategory,
          videoType: category === 'shorts_reels' ? 'Shorts / Reels' : 'Long Videos',
          youtubeId: ytId,
          url: entry.url,
          embedUrl: ytId ? `https://www.youtube.com/embed/${ytId}` : entry.url,
          tags: enrich ? enrich.tags : [inferredCategory, category === 'shorts_reels' ? 'Vertical Reel' : 'Widescreen', 'Shorts'],
          description: enrich ? enrich.description : 'High-impact editing with clean cuts, sound design, and motion polish.',
          aspectRatio
        });
      }
    }

    // --- Parse voiceovers ---
    const parsedVoiceovers = [];

    for (const entry of (json.voiceOvers || [])) {
      const enrich = enrichments.voiceover[entry.url];
      const lowerTitle = entry.title.toLowerCase();
      const isHindi = lowerTitle.includes('hindi');
      const language = isHindi ? 'Hindi' : 'English';

      let voCategory = 'Commercial & Brand';
      if (lowerTitle.includes('dubbing')) voCategory = 'Dubbing & Character';
      else if (isHindi) voCategory = 'Narration & Storytelling';

      parsedVoiceovers.push({
        id: `vo-${parsedVoiceovers.length + 1}`,
        title: enrich ? enrich.title : formatTitle(entry.title),
        language,
        category: enrich ? enrich.category || voCategory : voCategory,
        url: entry.url,
        embedUrl: buildSoundCloudEmbed(entry.url),
        tags: enrich ? enrich.tags : [language, voCategory, 'Voiceover'],
        description: enrich ? enrich.description : 'Professional vocal delivery recorded with studio precision.',
        tone: enrich ? enrich.tone : 'Clear, expressive, and versatile'
      });
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

// ─── fallback (used before JSON loads) ───────────────────────────────────────

const fallbackData = {
  videoEdits: [
    {
      id: 'video-1',
      title: 'Artisanal Coffee Commercial Ad',
      category: 'Commercial Ads',
      videoType: 'Shorts / Reels',
      youtubeId: 'tIyLS4uGsts',
      url: 'https://youtube.com/shorts/tIyLS4uGsts?feature=share',
      embedUrl: 'https://www.youtube.com/embed/tIyLS4uGsts',
      tags: ['Product Ad', 'Fast Pacing', 'Sound Design'],
      description: 'High-impact product commercial with rhythmic sound effects, punchy transitions, and color enhancement.',
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
    }
  ]
};

export { fallbackData };
