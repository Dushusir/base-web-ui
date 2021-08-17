import {
    Layout,
    Header,
    Footer,
    Content,
    Sider,
} from '../components/Layout';
import { Container, } from '../components/Container'

import { Component } from '../components/Component'

import {HeaderContainer} from './HeaderContainer'

import '../assets/css/reset.less';

// 页面级组价采用class写法
/**
 * LayoutContainer Demo
 */
interface IProps {
    element?: HTMLElement | null;
}

export class LayoutContainer extends Component {
    constructor(props?: IProps) {

        super(props);
    }

    /**
     * Render the component's HTML
     *
     * @returns {void}
     */
    render(): HTMLElement {
        return (
            <Container styles={{ height: `${window.innerHeight - 1}px`, background: 'gray' }}>

                <Layout>
                    <Header><HeaderContainer></HeaderContainer></Header>
                    <Layout>

                        <Content>Content</Content>
                        <Sider styles={{ background: 'orange' }}>Right</Sider>
                    </Layout>
                    <Footer>Footer</Footer>
                </Layout>

            </Container>
        );
    }
}