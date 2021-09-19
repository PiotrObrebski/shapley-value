import { connect } from 'react-redux';

interface IAppBodyProps{
  applicationKey: string
}

const AppBodyNotConnected = (props: any): JSX.Element => {
  const { applicationKey } = props

  return (
    <div>{applicationKey}</div>
  )
}

const mapStateToProps = (
  state: {
    aplication: {applicationKey: string}
  }
) => {
  const { aplication } = state;
  
  return { applicationKey: aplication.applicationKey };
}

const AppBody = connect(mapStateToProps, null)(AppBodyNotConnected)

export default AppBody;
