import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Cropper from 'react-cropper'
import { getUserGallery, addToGallery, saveAvatar } from '../../actions/user'
import { toggleModal } from '../../actions/ui'
import BtnMain from '../buttons/btn_main'
import BtnUpload from '../buttons/btn_upload'
import { makeCDN } from '../../utils'

class AvatarGallery extends Component {

    constructor(props) {
        super(props)
        this.state = {
        	avatar: props.avatar
        }
        this.cropData = {}
        this.rotateBtnLeft = null
        this.rotateBtnRight = null
    }

    crop = () => {
        let crop = this.refs.cropper.getData()
        this.cropData = {
            width: crop.width.toFixed(),
            height: crop.height.toFixed(),
            x: crop.x.toFixed(),
            y: crop.y.toFixed(),
            avatar: this.state.avatar,
            rotate: crop.rotate * -1,
        }
    }

    handleClick = item => e => {
    	this.setState({avatar: item.src})
    }

    cancel = () => {
    	const { dispatch } = this.props
    	dispatch(toggleModal(false, 'avatar'))
    }

    save = () => {
    	const { dispatch } = this.props
    	dispatch(saveAvatar(this.cropData)).then(res => {
    		if (res) {
    			dispatch(toggleModal(false, 'avatar'))
    		}
    	})
    }

    upload = files => {
    	const { dispatch } = this.props
    	dispatch(addToGallery(files[0]))
    }

    printGallery = (item, i) => {
		return 	<div key={i} className="message-gallery-item" onClick={this.handleClick(item)}>
					<img src={makeCDN(item.src)} className="img-responsive pointer" alt="" />
				</div>
	}

    rotateStartLeft = e => {
        this.needRotate = true
        this.rotate(1)
        this.rotateBtnLeft.addEventListener('mouseup', this.cancelRotate)
    }

    rotateStartRight = e => {
        this.needRotate = true
        this.rotate(-1)
        this.rotateBtnRight.addEventListener('mouseup', this.cancelRotate)
    }

    cancelRotate = () => {
        this.needRotate = false
        this.crop()
    }

    rotate = vector => {
        if (this.needRotate) {
            setTimeout(() => {
                this.refs.cropper.rotate(vector)
                this.rotate(vector)
            }, 10) 
        }
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getUserGallery())
        this.rotateBtnLeft.addEventListener('mousedown', this.rotateStartLeft)
        this.rotateBtnRight.addEventListener('mousedown', this.rotateStartRight)
    }

    render() {
    	const { gallery } = this.props
        return (
            <div>
            	<Row>
                    <Col sm={4}>
                    	<Cropper
                            ref='cropper'
                            src={this.state.avatar}
                            style={{ height: '200px', width: '100%', margin: '0 auto' }}
                            aspectRatio={1 / 1}
                            guides={false}
                            background={false}
                            cropend={this.crop}
                            ready={this.crop} />
                        <div className="gallery-item-menu-item font-bebas text-center">
                            <i className="fas fa-chevron-left pointer pull-left" ref={ref => this.rotateBtnLeft = ref}></i>
                            Rotate
                            <i className="fas fa-chevron-right pointer pull-right" ref={ref => this.rotateBtnRight = ref}></i>
                        </div>
                    </Col>
                    <Col sm={8}>
                    	<div className="message-gallery-wrap">
		                	{ gallery.map((item, i) => this.printGallery(item, i)) }
		                </div>
                    </Col>
                </Row>
                <div className="text-right">
                	<BtnUpload
                		className="pull-left"
                        onChange={this.upload}
                        text="Upload photo" />
                    <BtnMain
                        text="Cancel"
                        onClick={this.cancel} />
                    <BtnMain
                        text="Save"
                        onClick={this.save} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state =>
	({
	    gallery: state.user.data.gallery,
	    avatar: state.user.data.avatar.original
	})

export default connect(mapStateToProps)(AvatarGallery)