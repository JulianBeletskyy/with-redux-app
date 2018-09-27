import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserGallery } from '../../actions/user'
import { confirmAlert } from 'react-confirm-alert'
import { removePhotos, toggleActive, addToGallery } from '../../actions/user'
import { setAlert } from '../../actions/ui'
import Lightbox from 'react-images'
import BtnUpload from '../buttons/btn_upload'

class Gallery extends Component {

    constructor(props) {
        super(props);
        const { dispatch } = props
        dispatch(getUserGallery())
        this.state = {
        	activeMenu: 0,
        	open: false,
        	current: 0,
        }
    }

    showGallery = i => e => {
    	this.setState({open: true, current: i})
    }

    closeGallery = () => {
    	this.setState({open: false})
    }

    gotoPrevious = () => {
    	this.setState({current: this.state.current-1})
    }

    gotoNext = () => {
    	this.setState({current: this.state.current+1})
    }

    goToImage = i => {
    	this.setState({current: i})
    }

    showMenu = id => e => {
    	e.stopPropagation()
    	this.setState({activeMenu: id})
    }

    closeMenu = e => {
        e.stopPropagation()
    	this.setState({activeMenu: 0})
    }

    remove = id => e => {
    	e.stopPropagation()
    	const { dispatch } = this.props
    	confirmAlert({
            title: '',
            message: 'Are you sure to remove this photo?',
            buttons: [
                {
                    label: 'Cancel'
                }, {
                    label: 'Confirm',
                    onClick: () => dispatch(removePhotos({'images': [id]}))
                }
            ]
        })
    }

    toggleActive = item => e => {
    	e.stopPropagation()
    	const { dispatch, role } = this.props

    	if (role === 'client') {
    		const url = item.active ? 'hide' : 'show'
    		if ((this.checkActive() && url === 'show') || url === 'hide') {
    			dispatch(toggleActive({'images': [item.id]}, url)).then(res => {
    				this.closeMenu()
    			})
    		} else {
    			dispatch(setAlert('You can\'t make more active photos', 'error'))
    		}
    	} else {
    		const url = item.private ? 'public' : 'private'
    		dispatch(toggleActive({'images': [item.id]}, url)).then(res => {
    			this.closeMenu()
    		})
    	}
    }

    checkActive = () => {
    	const { membership, gallery } = this.props
    	return gallery.filter(item => item.active).length < membership.my_photo
    }

    upload = files => {
        const { dispatch } = this.props
        dispatch(addToGallery(files[0]))
    }

    printGallery = (item, i) => {
    	const { role } = this.props
    	const textMenu = role === 'client' ? (!item.active ? 'active' : 'unactive') : (!item.private ? 'private' : 'public')
    	const text = role === 'client' ? (item.active ? 'active' : 'unactive') : (item.private ? 'private' : 'public')
    	const colorClass = role === 'client' ? (item.active ? 'success' : 'danger') : (item.private ? 'danger' : 'success')

    	return 	<div key={i} className="wrap-gallery-item" onClick={this.showGallery(i)}>
		            <img src={item.src} className="gallery-item-img" alt="" />
		                <span className="gallery-item-icon" onClick={this.showMenu(item.id)}>
	                        <i className="fas fa-pen-square fa-2x"></i>
	                    </span>
		            <ul className={`gallery-item-menu ${this.state.activeMenu === item.id ? `active` : ``}`}>
		                <span onClick={this.closeMenu} className="gallery-item-close pointer"><i className="fas fa-times"></i></span>
		                <li onClick={this.remove(item.id)} className="gallery-item-menu-item font-bebas">Remove Photo</li>
		                <li onClick={this.toggleActive(item)} className="gallery-item-menu-item font-bebas">Make {textMenu}</li>
		            </ul>
		            <span className={`gallery-item-info ${colorClass}`}>{text}</span>
		        </div>
    }

    render() {
    	const { gallery = [] } = this.props
        return (
            <div>
                <div className="text-right">
                    <BtnUpload
                        onChange={this.upload}
                        text="Upload photo" />
                </div>
                <div className="wrap-gallery">
                	{ gallery.map((item, i) => this.printGallery(item, i)) }
                </div>
                <Lightbox
                    images={gallery}
                    isOpen={this.state.open}
                    backdropClosesModal={true}
                    showImageCount={true}
                    currentImage={this.state.current}
                    onClickPrev={this.gotoPrevious}
                    onClickNext={this.gotoNext}
                    onClickThumbnail={this.goToImage}
                    showThumbnails={true}
                    onClose={this.closeGallery} />
            </div>
        )
    }
}

const mapStateToProps = state =>
	({
		gallery: state.user.data.gallery,
		role: state.user.data.role,
		membership: state.user.data.membership,
	})

export default connect(
	mapStateToProps
)(Gallery)
