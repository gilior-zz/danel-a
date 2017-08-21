import { animate, AnimationEntryMetadata, state, style, transition, trigger, keyframes } from '@angular/core';

// Component transition animations
export const faqConfirmAnimation: AnimationEntryMetadata =
    trigger('confirmState', [
        state('0', style({ transform: 'scale(0)' })),
        transition('0 => 1', [
            animate('1s 150ms', keyframes([
                style({ transform: 'scale(0)', offset: 0 }),
                style({ transform: 'scale(1.5)', offset: 0.7 }),
                style({ transform: 'scale(1.0)', offset: 1.0 })
            ]))
        ]),
        transition('1 => 0', [
            animate(1500, keyframes([
                style({ transform: 'scale(1)', offset: 0 }),
                style({ transform: 'scale(1.5)', offset: 0.7 }),
                style({ transform: 'scale(0)', offset: 1.0 })
            ]))
        ])
    ])

