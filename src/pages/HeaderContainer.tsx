import {Button} from '../components/Button';
import {Select} from '../components/Select';
import {Container} from '../components/Container';

// 无状态组件采用function写法
export const HeaderContainer = ()=>{
    return (
        <Container styles={{ height: '60px', background: 'gray' }}>
            <Button className={`btn-primary`}>按钮</Button>
            <Select data={[{value:1,selected:true},{value:2,selected:true},]}></Select>
        </Container>
    )
}