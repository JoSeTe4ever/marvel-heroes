import React, { PureComponent } from 'react';
import { setCharactersByQuery } from '../../utils/api';
import styles from './marvelButton.module.css';

type ButtonProps = {
    text: string,
    searchText: string,
    onClickedAction: any,
    pagination: Function
}

export default class MarvelButton extends PureComponent<ButtonProps> {

    render() {
        return (
            <span className={styles.button} onClick={() => {
                setCharactersByQuery(this.props.pagination, this.props.onClickedAction, this.props.searchText)
            }}>
                {this.props.text}
            </span>
        )
    }
}