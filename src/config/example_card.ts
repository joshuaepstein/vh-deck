import { Card, CardColor } from '@/types/card'

const card: Card = {
    tier: 2,
    entries: [
        {
            name: {
                text: 'Item Quantity Card',
            },
            groups: ['Utility', 'Stat', 'Foil'],
            model: 'the_vault:card/icon/item_quantity#inventory',
            colors: [CardColor.GREEN],
            modifier: {
                type: 'gear',
                config: {
                    pool: [
                        {
                            tier: 1,
                            config: {
                                min: 0.005,
                                max: 0.005,
                                step: 1.0,
                            },
                        },
                        {
                            tier: 2,
                            config: {
                                min: 0.01,
                                max: 0.01,
                                step: 1.0,
                            },
                        },
                        {
                            tier: 3,
                            config: {
                                min: 0.015,
                                max: 0.015,
                                step: 1.0,
                            },
                        },
                        {
                            tier: 4,
                            config: {
                                min: 0.02,
                                max: 0.02,
                                step: 1.0,
                            },
                        },
                        {
                            tier: 5,
                            config: {
                                min: 0.025,
                                max: 0.025,
                                step: 1.0,
                            },
                        },
                    ],
                    attribute: 'the_vault:item_quantity',
                    maxTier: 5,
                },
                values: [
                    {
                        tier: 1,
                        value: 0.005,
                    },
                    {
                        tier: 2,
                        value: 0.01,
                    },
                    {
                        tier: 3,
                        value: 0.015,
                    },
                    {
                        tier: 4,
                        value: 0.02,
                    },
                    {
                        tier: 5,
                        value: 0.025,
                    },
                ],
            },
        },
    ],
}

export default card
