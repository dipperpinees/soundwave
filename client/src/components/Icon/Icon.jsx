import { AiOutlineRight, AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';

const lineIconStyle = { fontSize: '12px', display: 'inline', marginLeft: '4px' };

const LineRightIcon = () => <AiOutlineRight style={lineIconStyle} />;

const LineDownIcon = () => <AiOutlineDown style={lineIconStyle} />;

const LineUpIcon = () => <AiOutlineUp style={lineIconStyle} />;

export { LineRightIcon, LineDownIcon, LineUpIcon };
