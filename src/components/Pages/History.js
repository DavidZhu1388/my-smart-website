import React from 'react'
import HistoryList from './HistoryList';

class History extends React.Component {

  render() {
    const { user } = this.props;
    return (
      <div style={{ paddingTop: '70px' }}>
        <div className='white f3'>
          {`${user.name}, your current entry count is...`}
        </div>
        <div className='white f1'>
          {user.entries}
        </div>

        <div className='white f3' style={{ padding: '20px' }}>
          {`Here are your past images searched`}
        </div>
{/* 
        {console.log(user.images)}
        {console.log(user.faceboxes)} */}

        <HistoryList images={user.images} faceboxes={user.faceboxes} />

      </div>

    );
  }
}

export default History