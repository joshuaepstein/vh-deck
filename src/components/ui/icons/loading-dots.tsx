import styles from './loading-dots.module.css'

/**
 * @deprecated Use `LoadingCircle` instead.
 */
export const LoadingDots = ({ color = '#000' }: { color?: string }) => {
    return (
        <span className={styles.loading}>
            <span style={{ backgroundColor: color }} />
            <span style={{ backgroundColor: color }} />
            <span style={{ backgroundColor: color }} />
        </span>
    )
}

/**
 * @deprecated Use `LoadingCircle` instead.
 */
export const LoadingDotsThemed = ({ inverted }: { inverted?: boolean }) => {
    return (
        <span className={!inverted ? styles.loading : styles.loadingInverted}>
            <span />
            <span />
            <span />
        </span>
    )
}
