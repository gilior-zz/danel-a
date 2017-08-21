import { animate, AnimationEntryMetadata, state, style, transition, trigger } from '@angular/core';

// Component transition animations
export const filesAnimation: AnimationEntryMetadata =
    trigger('files', [
        state('1', style({
            backgroundColor: 'red',
            fontSize: 'larger',
            color: 'black'
        })),

        transition('1 <=> 0', animate('100ms ease-in'))

    ]);
