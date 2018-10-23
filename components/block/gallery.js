import React, { Component } from 'react'
import { connect } from 'react-redux'
import { confirmAlert } from 'react-confirm-alert'
import { removePhotos, toggleActive, addToGallery, getUserGallery, makePrivate } from '../../actions/user'
import { setAlert } from '../../actions/ui'
import BtnUpload from '../buttons/btn_upload'
import { makeBlur } from '../../utils'
import GalleryItem from './gallery_menu'
import FullScreenSlider from '../gallery/full_screen_slider'

class Gallery extends Component {

    state = {
            activeMenu: 0,
            open: false,
            current: 0,
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
        if (e) {
            e.stopPropagation()
        }
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
    				this.setState({activeMenu: 0})
    			})
    		} else {
    			dispatch(setAlert('You can\'t make more active photos', 'error'))
    		}
    	} else {
    		const url = item.private ? 'public' : 'private'
            if (!item.private) {
                this.makeBlur(item)
                return
            }
    		dispatch(toggleActive({'images': [item.id]}, url)).then(res => {
    			this.setState({activeMenu: 0})
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
    	return 	<GalleryItem
                    key={i}
                    active={this.state.activeMenu === item.id}
                    onClose={this.closeMenu}
                    showGallery={this.showGallery(i)}
                    showMenu={this.showMenu(item.id)}
                    checkActive={this.checkActive}
                    item={item} />
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getUserGallery())
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
                {
                    this.state.open 
                    &&  <FullScreenSlider
                        backDrop={this.closeGallery}
                        initialSlide={this.state.current}
                        list={gallery} />
                }
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

export default connect(mapStateToProps)(Gallery)