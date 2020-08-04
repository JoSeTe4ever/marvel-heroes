import React, { PureComponent } from 'react'
import styles from './marvelButton.module.css';
export default class MarvelButton extends PureComponent {
    render() {
        return (
            <span className={styles.button}>
                ejemplo de boton
            </span>
        )
    }
}
