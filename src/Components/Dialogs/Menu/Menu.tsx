import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import WarningIcon from '@material-ui/icons/Warning';
import { connect } from 'react-redux';
import { solidLogin, setHost, enterFolder, solidLogout, clearCache, MyDispatch, setErrorMessage, closeDialog } from '../../../Actions/Actions';
import { getLocationObjectFromUrl } from '../../HistoryHandler/HistoryHandler';
import { DialogButtonClickEvent, DialogDispatchProps, DialogStateProps } from '../dialogTypes';
import { AppState } from '../../../Reducers/reducer';
import { DIALOGS } from '../../../Actions/actionTypes';

class FormDialog extends Component<ChooseLocationProps> {
    state = {
        location: 'http://',
    };

    componentWillReceiveProps(props: ChooseLocationProps) {
        const { isLoggedIn, webId } = props;
        const params = new URLSearchParams(document.location.search.substr(1));
        const encodedUrl = params.get('url');

        if (encodedUrl !== null) {
            const location = decodeURI(encodedUrl);
            this.setState({ location });
        }
        else if (isLoggedIn && webId) {
            const location = (new URL(webId)).origin;
            this.setState({ location });
        }
    }
    componentDidMount() {
        if(!this.props.isLoggedIn) {
            this.props.initLogin();
        }
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const targetForm = event.currentTarget.form;
        if (targetForm) {
            const input = targetForm.querySelector('input');
            if (input) {
                const location = input.value;
                this.setState({ location });
                return;
            }
        }
        // console.log("Couldn't find location input");
    }

    handleSubmit(event: DialogButtonClickEvent) {
        this.props.handleSubmit(event, { location: this.state.location });
    }

    render() {
        let { location } = this.state;
        location = location ? location : '';
        const { handleClose, handleLogin, handleLogout, open, isLoggedIn } = this.props;

        return (
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-choose-location" fullWidth={true} maxWidth={'sm'}>
                <form>
                    <DialogTitle id="form-dialog-choose-location" style={{ display:'flex', flexDirection:'row' }}>
                        {isLoggedIn? "Enter your storage location" : "Login to your Solid Pod"}
                    </DialogTitle>
                    <DialogContent>
                        {isLoggedIn &&
                            <React.Fragment>
                                <TextField autoFocus fullWidth
                                    margin="normal"
                                    label="Storage Location"
                                    variant="outlined"
                                    onChange={this.handleChange.bind(this)}
                                    value={location} />
                                <div style={{display:'flex', flexDirection:'row', alignItems:'center',  marginTop: 20 }}>
                                    <WarningIcon style={{marginRight: 10, color: "#ffb74d" }} />
                                    <Typography variant="body1"> To share a file with others, make sure to choose a public folder!</Typography>
                                </div>
                            </React.Fragment>
                        }
                    </DialogContent>
                    <DialogActions style={{ margin: 20 }}>
                        <Button onClick={handleClose} color="primary" type="button">
                            Cancel
                        </Button>
                        {isLoggedIn?  
                            <React.Fragment>
                                <Button color="primary" style={{ marginRight: 10 }} onClick={handleLogout}>Logout</Button>
                                <Button color="primary" style={{ marginRight: 10 }} type="submit" variant="contained" onClick={this.handleSubmit.bind(this)}>Open directory</Button>
                            </React.Fragment>
                            :
                            <Button variant="outlined" color="primary" onClick={handleLogin}>Login</Button>
                        }
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}

interface StateProps extends DialogStateProps {
    webId: string | null;
    isLoggedIn: boolean;
}
interface DispatchProps extends DialogDispatchProps {
    initLogin(): void;
    handleLogin(event: DialogButtonClickEvent): void;
    handleLogout(event: DialogButtonClickEvent): void;
    handleSubmit(event: DialogButtonClickEvent, { location }: { location: string }): void;
}
interface ChooseLocationProps extends StateProps, DispatchProps { }


const mapStateToProps = (state: AppState): StateProps => {
    return {
        open: state.visibleDialogs.CHOOSE_LOCATION,
        webId: state.account.webId,
        isLoggedIn: state.account.loggedIn
    };
};

const mapDispatchToProps = (dispatch: MyDispatch): DispatchProps => {
    return {
        initLogin: () => {
            dispatch(solidLogin());
        },
        handleClose: () => {
            dispatch(closeDialog(DIALOGS.CHOOSE_LOCATION));
        },
        handleLogin: event => {
            event.preventDefault();
            dispatch(solidLogin());
        },
        handleLogout: event => {
            event.preventDefault();
            dispatch(solidLogout());
        },
        handleSubmit: (event, { location }) => {
            event.preventDefault();
            if (!location)
                return dispatch(setErrorMessage("Please enter the folder which should be opened"));

            const { host, path } = getLocationObjectFromUrl(location);
            dispatch(closeDialog(DIALOGS.CHOOSE_LOCATION));
            dispatch(setHost(host));
            dispatch(clearCache());
            dispatch(enterFolder(path));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
