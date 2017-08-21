import { animate, AnimationEntryMetadata, state, style, transition, trigger } from '@angular/core';

// Component transition animations
export const inputErrorAnim: AnimationEntryMetadata =
       trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-50%)' }),
        animate('.7s')
      ]),
      transition('* => void', [
        animate('.7s', style({ transform: 'translateX(-50%)' }))
      ])
    ]);
