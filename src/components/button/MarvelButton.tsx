import React, { PureComponent } from 'react'
import styles from './marvelButton.module.css';


type ButtonProps = {
    text: string,
    clicked: any
}

export default class MarvelButton extends PureComponent<ButtonProps> {
    render() {
        return (
            <span className={styles.button} onClick={() => this.props.clicked()}>
                {this.props.text}
            </span>
        )
    }
}