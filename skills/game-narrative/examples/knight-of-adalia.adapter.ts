// Knight of Adalia on the game-narrative text tools (tools/narrative/): one adapter, four tools.
import { join } from 'node:path';
import { loadContent, CONTENT_DIR } from './content-loader';
import { textsOf } from './lint-style';
import { playOnce, DEFAULT_POLICIES } from './bot-lib';
import { view } from '../src/game/index';
import { validateCond, test } from '@engine/conditions';
import type { ContentBundle } from '../src/content/schema';
import type { GameState } from '../src/game/state';
import type { NarrativeAdapter, Seen } from './narrative/adapter';

export const adapter: NarrativeAdapter<ContentBundle, GameState> = {
  name: 'Knight of Adalia',
  load: () => loadContent(),
  styleGuide: join(CONTENT_DIR, 'style-guide.md'),
  textsOf,
  play(content, runs, observe) {
    for (const bg of Object.keys(content.backgrounds)) for (let i = 0; i < runs; i++) {
      playOnce(content, bg, 7 + i * 7919, DEFAULT_POLICIES[i % DEFAULT_POLICIES.length]!, 3000, (s) => {
        if (s.ended) return;
        const v = view(content, s);
        const from = s.journal.at(-1)?.scene ?? s.scene;
        const texts: Seen[] = [{ kind: 'text', scene: s.scene, text: v.text }, { kind: 'title', scene: s.scene, text: v.title ?? '' }, { kind: 'outcome', scene: from, text: v.outcome?.text ?? '' }, ...v.choices.map((c) => ({ kind: 'choice' as const, scene: s.scene, text: c.text }))];
        observe({ state: s, scene: s.scene, texts });
      });
    }
  },
  scenes: (content) => Object.values(content.scenes).map((s) => ({ ...s, group: s.chapter }) as never),
  cond: { validate: (src, c) => validateCond(src as never, c), test: (src, s, c) => test(src as never, s, c) },
  continuityFile: join(CONTENT_DIR, 'continuity.yaml'),
  groupOf: (content, scene) => content.scenes[scene]?.chapter,
  dead: (s, content) => Object.entries(content.registry.npcs).filter(([id]) => s.npcs[id] && !s.npcs[id]!.alive).map(([id, n]) => {
    const first = n.name.split(' ')[0]!;
    return { id, names: [...(n.name.includes(' ') ? [n.name] : []), ...(n.title ? [`${n.title} ${first}`] : [])] };
  }),
};
