import React from "react";
import { service1, service2, service3, service4 } from "./icons";

const Services = () => {
    return (
        <section className="services">
            <div className="container-fluid">
                <div className="service-list">
                    <div className="service-item">
                        <img src={service1} className="service__image" />
                        <div className="service-info">
                            <h4 className="service__name">High Quality</h4>
                            <p className="service__description">crafted from top materials</p>
                        </div>
                    </div>
                    {/*End service-item*/}
                    <div className="service-item">
                        <img src={service2} className="service__image" />
                        <div className="service-info">
                            <h4 className="service__name">High Quality</h4>
                            <p className="service__description">crafted from top materials</p>
                        </div>
                    </div>
                    {/*End service-item*/}
                    <div className="service-item">
                        <img src={service3} className="service__image" />
                        <div className="service-info">
                            <h4 className="service__name">High Quality</h4>
                            <p className="service__description">crafted from top materials</p>
                        </div>
                    </div>
                    {/*End service-item*/}
                    <div className="service-item">
                        <img src={service4} className="service__image" />
                        <div className="service-info">
                            <h4 className="service__name">High Quality</h4>
                            <p className="service__description">crafted from top materials</p>
                        </div>
                    </div>
                    {/*End service-item*/}
                </div>
            </div>
        </section>
    );
};

export default Services;
