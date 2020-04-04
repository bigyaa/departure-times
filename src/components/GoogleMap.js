import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, InfoBox, Marker, Circle } from "@react-google-maps/api";
//official doc: https://react-google-maps-api-docs.netlify.com/#circle

const MAP_API = process.env.REACT_APP_MAP_API;

const ModifiedGoogleMap = (props) => {
	const [position, setPosition] = useState({ lat: 27, lng: 85 });

	const setLocation = () =>
		navigator?.geolocation?.getCurrentPosition((success) => {
			setPosition({
				lat: parseFloat(success?.coords?.latitude),
				lng: parseFloat(success?.coords?.longitude),
			});
		});

	useEffect(setLocation, []);

	return (
		<div className="map-container clearfix">
			{position && (
				<LoadScript id="script-loader" googleMapsApiKey={MAP_API} {...props}>
					<GoogleMap
						mapContainerStyle={{
							height: "400px",
							// width: "800px",
						}}
						center={position}
						zoom={11}
					>
						{/* <InfoBox
							// onLoad={onLoad}
							// options={options}
							position={position}
						>
							<div
								style={{
									backgroundColor: "yellow",
									opacity: 0.75,
									padding: 12,
								}}
							>
								<div style={{ fontSize: 16, fontColor: `#08233B` }}>
									Hello, World!
								</div>
							</div>
						</InfoBox> */}

						<Marker position={position} />

            <Circle center={position} radius={300} />
					</GoogleMap>
				</LoadScript>
			)}
		</div>
	);
};

export default ModifiedGoogleMap;
