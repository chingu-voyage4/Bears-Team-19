import React from 'react';
import {mount, shallow} from 'enzyme';

import Register from './register';

describe('Register', () => {
  it('username should match inputs.username', () => {

    const inputs = {
        username: "User",
        password: 'test',
        confirmPassword: 'test'
    };

    const wrapper = shallow(
        <Register inputs={inputs} handleClick={(e) => e} />
    );

    // takes first input
    const firstInput = wrapper.find('input').at(0);
    expect(firstInput.props().value).toMatch(/User/);
  });
});
