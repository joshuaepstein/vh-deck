// useRandomId hook

import { useState } from 'react'
import { prefixedId } from '../utils'

export const useRandomId = (prefix: string) => {
    const [id] = useState(prefixedId(prefix))
    return id
}
