import React from 'react'

const SideNav = () => {
    return (
        <>
                        <div class="list-group row" id="list-tab" role="tablist">
                <p className=" col-12 my-2 text-center list-group-item list-group-item-action form-control active" id="myProfileTab"
                    data-toggle="list" href="#list-home" role="tab" onclick="editValueToProfile()">My Profile</p>
                <p className=" col-12 my-2 text-center list-group-item list-group-item-action form-control" id="userForAdminTab" data-toggle="list"
                    href="#list-profile" onclick="userForAdminTab()" role="tab">Users</p>
                </div>    
        </>
    )
}

export default SideNav
