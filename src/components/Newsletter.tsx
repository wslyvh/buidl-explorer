import { Divider } from "antd";
import React, { Component } from "react";

class Newsletter extends Component {
    public render() {
        return (
            <div style={{ textAlign: "center" }}>
                <Divider><h2>Stay connected</h2></Divider>
                <p>Sign-up for updates on new projects, tasks and development.</p>

                <div id="mc_embed_signup">
                    <form action="https://herokuapp.us19.list-manage.com/subscribe/post?u=77ac9526e3208fe98c77e6252&amp;id=afdc7ac712"
                        method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
                        <div id="mc_embed_signup_scroll">

                            <div id="mce-responses" className="clear">
                                <div className="response" id="mce-error-response"></div>
                                <div className="response" id="mce-success-response"></div>
                            </div>
                            <div aria-hidden="true" style={{ position: "absolute", left: -5000 }}>
                                <input type="text" name="b_77ac9526e3208fe98c77e6252_afdc7ac712" tabIndex={-1} defaultValue="" />
                            </div>

                            <span className="ant-input-search">
                                <input type="email" name="EMAIL" placeholder="Enter your email" className="ant-input" id="mce-EMAIL" style={{maxWidth: 400}} />
                                <span className="ant-input-suffix">
                                    <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="ant-btn ant-input-search-button ant-btn-primary" />
                                </span>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Newsletter;
