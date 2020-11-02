import React, { Component } from 'react';
import FileList from './Components/FileList/FileList';
import Navbar from './Components/Navbar/Navbar';
import ContextMenu from './Components/ContextMenu/ContextMenu';
import Dialogs from './Components/Dialogs/Dialogs';

import { MuiThemeProvider as MaterialUI, createMuiTheme, WithStyles } from '@material-ui/core/styles';
import { Dialog, Button } from '@material-ui/core';

import blue from '@material-ui/core/colors/blue';
import { connect } from 'react-redux';
import { initApp, MyDispatch, closeContextMenu, selectItem } from './Actions/Actions';
import DynamicSnackbar from './Components/Notification/DynamicSnackbar';
import HistoryHandler from './Components/HistoryHandler/HistoryHandler';
import { AppState } from './Reducers/reducer';
import { FileItem, Item } from './Api/Item';

const theme = createMuiTheme({
    palette: {
        primary: blue,
    },
    typography: {
        useNextVariants: true,
    }
});

class App extends Component<AppProps> {

    state = {
        dialogOpen:false,
    };
    componentDidMount() {
        this.props.init();
    };
    searchFile(val:any){
        this.setState({dialogOpen:val});
    }

    render() {

        const { selectedItem } = this.props;
        const isFileSelected = selectedItem instanceof FileItem;
        console.log(isFileSelected, selectedItem);

        return (
            <div className="App">
                {/* <div style={{ display:'flex', justifyContent:'center', alignItems:'center', padding: 100}}>
                    {!isFileSelected && 
                        <Button onClick={e =>this.searchFile(true)}>Select a score from your Solid pod</Button>
                    }
                    {isFileSelected && 
                        <div>
                            <p>{`Filename: ${selectedItem._name}`}</p>
                            <p>{"Score URL: "}
                                <span 
                                    style={{fontWeight:'bold', cursor:'pointer'}} 
                                    onClick={e => window.location.href=selectedItem.url}>
                                        {selectedItem._url}
                                </span>
                            </p>
                        </div>

                    }
                </div> */}
                {/* <Dialog open={true}> */}
                    {/* <MaterialUI theme={theme}> */}
                    <div onClick={this.props.handleHideContextMenu} onContextMenu={this.props.handleHideContextMenu}>
                        <Navbar />
                        <FileList />
                        <ContextMenu />
                        <DynamicSnackbar />
                        <Dialogs />
                    </div>
                    {/* </MaterialUI> */}
                    <HistoryHandler />
                {/* </Dialog> */}
            </div>
        );
    }
}
interface StateProps {
    selectedItem: Item;
}
interface DispatchProps {
    init(): void;
    handleHideContextMenu(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}

interface AppProps extends StateProps, DispatchProps {};

const mapStateToProps = (state: AppState): StateProps => {
    const selectedItem: Item = state.items.selected[0];
    return {
        selectedItem,
    };
};

const mapDispatchToProps = (dispatch: MyDispatch): DispatchProps => {
    return {
        init: () => {
            dispatch(initApp());
        },

        handleHideContextMenu: (event) => {
            const element = event.target as HTMLElement;
            if (!(element.tagName === 'INPUT' || /label/i.test(element.className))) {
                event.preventDefault();
            }
            dispatch(closeContextMenu());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
