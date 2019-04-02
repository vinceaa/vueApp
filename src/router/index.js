import Vue from 'vue'
import Router from 'vue-router'
import Test from '@/components/test/Test'
import Main from '@/components/main/Main'
import TopicIndex from '@/components/topic/TopicIndex'
import TopicIndex1 from '@/components/topic/TopicIndex1'
import UserIndex from '@/components/user/UserIndex'
import UserRegister from '@/components/user/UserRegister'
import UserLogin from '@/components/user/UserLogin'
import UserInfor from '@/components/user/UserInfor'
import inputPop from '@/components/user/pop/inputPop'
import popChange from '@/components/user/pop/popChange'
import popMain from '@/components/user/pop/popMain'


import UserLogin1 from '@/components/user/UserLogin1'
import UserProfile from '@/components/user/UserProfile'
import TopicDetail from '@/components/topic/TopicDetail'
import TopicDetail1 from '@/components/topic/TopicDetail1'
// import TopicDetail2 from '@/components/topic/TopicDetail2'
import TopicDetail3 from '@/components/topic/TopicDetail3'
import TopicDetail4 from '@/components/topic/TopicDetail4'
import TopicWrite from '@/components/topic/TopicWrite'
import TopicWrite1 from '@/components/topic/TopicWrite1'
import markTest from '@/components/topic/markTest'



import Board from '@/components/board/admin'
import BoardEdit from '@/components/board/BoardEdit'
// import Hotspot from '@/components/hotspot/index'
import Hotspot from '@/components/hotspot/index'
import HotspotDetail from '@/components/hotspot/HotspotDetail'
import HotspotAdmin from '@/components/hotspot/HotspotAdmin'
import HotspotEdit from '@/components/hotspot/HotspotEdit'
import Photo from '@/components/photo/index'
import Photo1 from '@/components/photo/index1'
import indexSlide from '@/components/photo/indexSlide'
import indexSlideBoard from '@/components/photo/indexSlideBoard'
import PhotoChild from '@/components/photo/PhotoChild'
import PhotoBoardAdmin from '@/components/photo/PhotoBoardAdmin'
import PhotoBoardEdit from '@/components/photo/PhotoBoardEdit'
import PhotoAdmin from '@/components/photo/PhotoAdmin'
import PhotoDetail from '@/components/photo/PhotoDetail'
import PhotoEdit from '@/components/photo/PhotoEdit'
import BigPicPreview from '@/components/photo/BigPicPreview'
import BigPicPreviewSlide from '@/components/photo/BigPicPreviewSlide'
import SlidePic from '@/components/test/SlidePic'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/topic',
      name: 'TopicIndex',
      // component: TopicIndex,
      component: TopicIndex1,
    },
    {
      path: '/topic/detail',
      name: 'TopicDetail',
      // component: TopicDetail,
      // component: TopicDetail1,
      // component: TopicDetail2,
      // component: TopicDetail3,
      component: TopicDetail4,
    },
    {
      path: '/topic/write',
      name: 'TopicWrite',
      // component: TopicWrite,
      component: TopicWrite1,
    },
    {
      path: '/topic/markTest',
      name: 'markTest',
      component: markTest,
    },
    {
      path: '/user',
      name: 'UserIndex',
      component: UserIndex,
      children: [
          {
              path: 'register',
              name: 'UserRegister',
              component: UserRegister,
          },
          {
            path: 'login',
            name: 'UserLogin',
            // component: UserLogin,
            component: UserLogin1,
          },
          // {
          //   path: ':author_id',
          //   name: 'UserProfile',
          //   component: UserProfile,
          // },
      ]
    },
    {
      path: '/user/:author_id',
      name: 'UserProfile',
      component: UserProfile,
    },
    {
      path: '/user/infor',
      name: 'UserInfor',
      component: UserInfor,
    },
    {
      path: '/board',
      name: 'Board',
      component: Board,
    },
    {
      path: '/board/edit',
      name: 'BoardEdit',
      component: BoardEdit,
    },
    {
      path: '/hotspot',
      name: 'Hotspot',
      component: Hotspot,
    },
    {
      path: '/hotspot/detail/:hotspot_id',
      name: 'HotspotDetail',
      component: HotspotDetail,
    },
    {
      path: '/hotspot/admin',
      name: 'HotspotAdmin',
      component: HotspotAdmin,
    },
    {
      path: '/hotspot/edit',
      name: 'HotspotEdit',
      component: HotspotEdit,
    },
    {
      path: '/photo',
      name: 'Photo',
      // component: Photo,
      // component: Photo1,
      // component: indexSlide,
      component: indexSlideBoard,
      
      
      // component: Photo2,
      // children: [
      //   {
      //     component: PhotoChild,
      //     path: 'child',
      //     name: 'PhotoChild',
      //   },
      // ]
    },
    {
      path: '/photo/type',
      name: 'PhotoBoardAdmin',
      component: PhotoBoardAdmin,
    },
    {
      path: '/photo/type/edit',
      name: 'PhotoBoardEdit',
      component: PhotoBoardEdit,
    },
    {
      path: '/photo/admin',
      name: 'PhotoAdmin',
      component: PhotoAdmin,
    },
    {
      path: '/photo/detail/:photo_id',
      name: 'PhotoDetail',
      component: PhotoDetail,
    },
    {
      path: '/photo/preview/:photo_id/:index',
      // name: 'BigPicPreview',
      name: 'BigPicPreviewSlide',
      component: BigPicPreviewSlide,
    },
    {
      path: '/photo/edit',
      name: 'PhotoEdit',
      component: PhotoEdit,
    },
    {
      path: '/photo/test',
      name: 'SlidePic',
      component: SlidePic,
    },
    

    
  ]
})
