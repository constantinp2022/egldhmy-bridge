import * as React from 'react';
import { Link } from 'react-router-dom';
import { dAppName } from '../../src_egld/config';
import { routeNames } from '../../routes';

const Home = () => {
  return (
    <div className='d-flex flex-fill align-items-center container'>
      <div className='row w-100'>
        <div className='col-12 col-md-8 col-lg-5 mx-auto'>
          <div className='card shadow-sm rounded p-4 border-0'>
            <div className='card-body text-center'>
              <h2 className='mb-3' data-testid='title'>
                Elrond
              </h2>

              <p className='mb-3'>
                Lock EGLD - Contact admin for unlock.
              </p>

              <Link
                to={routeNames.unlock_egld}
                className='btn btn-primary mt-3 text-white'
                data-testid='loginBtnEGLD'
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className='row w-100'>
        <div className='col-12 col-md-8 col-lg-5 mx-auto'>
          <div className='card shadow-sm rounded p-4 border-0'>
            <div className='card-body text-center'>
              <h2 className='mb-3' data-testid='title'>
                Harmony
              </h2>

              <p className='mb-3'>
                Burn wEGLD - Contact admin for mint over Harmony
              </p>

              <Link
                to={routeNames.dashboard_hrc}
                className='btn btn-primary mt-3 text-white'
                data-testid='loginBtnHRC'
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div> 
  );
};

export default Home;
