import React from 'react';
import '../styles/Skeleton.css';

interface SkeletonProps {
	type: 'line' | 'circle';
	width?: string;
	height?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({type, width, height}) => {
	const classes = `skeleton ${
		type === 'line' ? 'skeleton-line' : 'skeleton-circle'
	}`;
	const style = {width, height};

	return <div className={classes} style={style}></div>;
};

export default Skeleton;
