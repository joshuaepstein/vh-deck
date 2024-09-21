import { Card, CardColor, CardTypes } from '@/types/card'
import Image from 'next/image'

export default function CardItemDisplay({ card }: { card: Card }) {
    const src = `/card/${
        // deckCards[0].entries[0].colors[0] -- Get the enum key from the value (CardColor)
        Object.keys(CardColor)
            .find((key) => CardColor[key as keyof typeof CardColor] === card.entries[0].colors[0])
            .toLowerCase()
    }${
        (card.entries[0].groups
            .find((group) => Object.values(CardTypes).includes(group))
            .toLowerCase() !== 'stat'
            ? '_' +
              card.entries[0].groups
                  .find((group) => Object.values(CardTypes).includes(group))
                  .toLowerCase()
            : '') || ''
    }${
        card.entries[0].groups
            .find((group) => Object.values(CardTypes).includes(group))
            .toLowerCase() !== 'resource' &&
        card.entries[0].groups
            .find((group) => Object.values(CardTypes).includes(group))
            .toLowerCase() !== 'arcane'
            ? '_' + card.tier
            : ''
    }.png`

    const modifier = card.entries[0].model.split('#')[0].split('/')[
        card.entries[0].model.split('#')[0].split('/').length - 1
    ]

    return (
        <div className="relative flex items-start justify-center">
            <Image
                src={`/card/icon/${modifier}.png`}
                width={64}
                height={64}
                alt="Modifier"
                className="absolute top-2 size-5"
                style={{
                    imageRendering: 'pixelated',
                }}
            />
            <Image
                src={src}
                width={64}
                height={64}
                alt="Card"
                className="size-12"
                style={{
                    imageRendering: 'pixelated',
                }}
                data-vault-card
                data-vault-card-tier={card.tier}
                data-vault-image-src={src}
            />
        </div>
    )
}
