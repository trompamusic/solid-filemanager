import React, { Component } from 'react';
import { connect } from 'react-redux';

import List from '@material-ui/core/List';
import File from '../File/File'; 
import FileListEmptyMessage from './FileListEmptyMessage';
import Loader from '../Loader/Loader'; 
import './FileList.css';
import { Item } from '../../Api/Item';
import { AppState } from '../../Reducers/reducer';

interface StateProps {
    items: Item[];
    isLoading: boolean;
}
interface FileListProps extends StateProps {};
class FileList extends Component<FileListProps> {
    render() {
        const { items, isLoading } = this.props;

        return <div className="FileList">
            { isLoading && <Loader />}
            { !isLoading && items.length === 0 && <FileListEmptyMessage />}
            { !isLoading && items.length > 0 && (
                <div>
                    <List dense={true}>
                        {items.map((item, key) => 
                            <File item={item} key={key} />
                        )}
                    </List>
                </div>
            )}
        </div>
    }
}



const mapStateToProps = (state: AppState): StateProps => {
    const items = state.items.inCurFolder
        .filter(item => filterMatch(item.getDisplayName(), state.items.filter));

    return {
        items,
        isLoading: state.loading,
    };
};


const mapDispatchToProps = () => ({});

const filterMatch = (first: string, second: string) => {
    return first.toLocaleLowerCase().match(second.toLocaleLowerCase());
}

export default connect(mapStateToProps, mapDispatchToProps)(FileList);


