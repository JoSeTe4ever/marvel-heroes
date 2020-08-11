import React, { PureComponent } from 'react'
import styles from './marvelButton.module.css';


type ButtonProps = {
    text: string,
}

export default class MarvelButton extends PureComponent<ButtonProps> {
    render() {
        return (
            <span className={styles.button}>
                {this.props.text}
            </span>
        )
    }
}