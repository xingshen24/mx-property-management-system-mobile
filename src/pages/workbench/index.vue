<template>
  <div class="app-wrapper">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>

    <div class="approval-card">
      <div class="card-header">
        <h2>我的审批</h2>
      </div>
      <div class="card-content">
        <div class="card-section pending">
          <div class="count" @click="toHandleApproval">{{ toHandleCount == null ? '?' : toHandleCount }}</div>
          <div class="label pending-label" is-link>待我处理</div>
        </div>
        <div class="card-section initiated">
          <div class="count">12</div>
          <div class="label initiated-label">我的发起</div>
        </div>
      </div>
    </div>

    <div class="data-content bg-white dark:bg-[--van-background-2]">
      <van-row>
        <van-col :span="6" class="menu-icon-wrapper" v-for="(shortcut, index) in shortcuts">
          <van-image width="3rem" height="3rem" fit="contain" :src="shortcut.icon" style="vertical-align: middle;"
            @click="router.push('/counter')" />
          <div class="menu-icon-title-end" v-if="index >= (Math.ceil(shortcuts.length / 4) - 1) * 4">
            {{ shortcut.title }}
          </div>
          <div class="menu-icon-title-not-end" v-else>{{ shortcut.title }}</div>
        </van-col>
      </van-row>
    </div>

    <van-tabs v-model:active="active" class="menu-tabs" style="margin-top: 20px;" v-if="menus.length > 0">
      <van-tab v-for="menuParent in menus" :title="menuParent.title">
        <div class="data-content bg-white dark:bg-[--van-background-2]"
          style="margin-top: 0;border-radius: 0 0 15px 15px;border-top: 1px solid #f0f0f0;">
          <van-row>
            <van-col :span="6" class="menu-icon-wrapper" v-for="(menu, index) in menuParent.children">
              <van-image width="3rem" height="3rem" fit="contain" :src="menu.svgIcon" style="vertical-align: middle;"
                @click="router.push(menu.path)" />
              <div class="menu-icon-title-end" v-if="index >= (Math.ceil(menuParent.children.length / 4) - 1) * 4">
                {{ menu.title }}
              </div>
              <div class="menu-icon-title-not-end" v-else>{{ menu.title }}</div>
            </van-col>
          </van-row>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
import MenuIcon from '@/assets/images/menu.svg'
import { Api } from '@/utils/request';

const svgs: any = import.meta.glob('@/assets/images/**/*.svg');
const svgMap = Object.assign({});
for (const entry of Object.entries(svgs)) {
  let match = entry[0].match(/\/([a-zA-Z0-9-]*\.svg)/g)[0]
  match = match.replace('/', '').replace('.svg', '');
  svgMap[match] = entry[1];
}

const active = ref('综合办')

interface Menu {
  title: string,
  icon: string,
  svgIcon?: string,
  path: string,
}

interface Menus {
  title: string,
  children: Menu[],
}

const router = useRouter();

const shortcuts = ref<Menu[]>([
  { title: '合同管理', icon: MenuIcon, path: '/menu-list' },
  { title: '合同管理', icon: MenuIcon, path: '/menu-list' },
  { title: '合同管理', icon: MenuIcon, path: '/menu-list' },
  { title: '合同管理', icon: MenuIcon, path: '/menu-list' },
  { title: '合同管理', icon: MenuIcon, path: '/menu-list' },
  { title: '合同管理', icon: MenuIcon, path: '/menu-list' },
  { title: '合同管理', icon: MenuIcon, path: '/menu-list' },
  { title: '合同管理', icon: MenuIcon, path: '/menu-list' },
  { title: '合同管理', icon: MenuIcon, path: '/menu-list' },
  { title: '合同管理', icon: MenuIcon, path: '/menu-list' },
  { title: '合同管理', icon: MenuIcon, path: '/menu-list' },
  { title: '合同管理', icon: MenuIcon, path: '/menu-list' },
  { title: '合同管理', icon: MenuIcon, path: '/menu-list' },
])

function setChildrenIcon(menu: Menus) {
  const children = menu?.children ?? []
  for (const child of children) {
    const icon = child.icon
    const promiseFn = svgMap[icon];
    promiseFn?.().then((icon: any) => child.svgIcon = (icon.default))
  }
}

const toHandleApproval = () => {
  router.push('/basic/approval')
}

const menus = ref<Menus[]>([])
Api.req('/system-mobile-menu/load-user-menu').success((_menus: Menus[]) => {
  _menus = _menus ?? []
  for (const menu of _menus) {
    setChildrenIcon(menu);
  }
  menus.value = _menus;
}).get();

const toHandleCount = ref();
Api.req('/workflow/count-workflow-task').success((cnt: number) => {
  toHandleCount.value = cnt
}).get();

</script>


<route lang="json5">
{
  name: 'Workbench'
}
</route>
<style scoped>
.data-content {
  height: auto;
  padding: 20px;
  margin-top: 20px;
  border-radius: 15px;
  background-color: white;
}

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}


.approval-card {
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
}

.card-header {
  padding: 20px 20px 0 20px;
  color: #55565D;
  display: flex;
  align-items: center;
  justify-content: space-between;

}

.card-header h2 {
  font-size: 20px;
  font-weight: 600;
}

.card-header i {
  font-size: 22px;
}

.card-content {
  display: flex;
}

.card-section {
  flex: 1;
  padding: 15px 15px 25px 15px;
  text-align: center;
  transition: background 0.3s;
}

.count {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #2c3e50;
}

.pending .count {
  color: #e74c3c;
  padding-left: 35px;
}

.pending-label {
  padding-left: 35px;
}

.initiated .count {
  padding-right: 35px;
  color: #3498db;
}

.initiated-label {
  padding-right: 35px;
}

.label {
  font-size: 14px;
  color: #7f8c8d;
  font-weight: 500;
}

.icon-wrapper {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
}

.pending .icon-wrapper {
  background: rgba(231, 76, 60, 0.15);
  color: #e74c3c;
}

.initiated .icon-wrapper {
  background: rgba(52, 152, 219, 0.15);
  color: #3498db;
}

.icon-wrapper i {
  font-size: 20px;
}

.menu-icon-wrapper {
  text-align: center;
}

.menu-icon-title-not-end {
  font-size: 3.5vw;
  text-align: center;
  margin-top: 3px;
  margin-bottom: 12px;
}

.menu-icon-title-end {
  font-size: 3.5vw;
  text-align: center;
  margin-top: 3px;
}

/* 引入第三方或自定义的字体图标样式 */
@font-face {
  font-family: 'iconfont';
  src: url('/iconfont.ttf?t=1758379139466') format('truetype');
}

.iconfont-icon {
  font-family: 'iconfont';
  font-style: normal;
}

.iconfont-icon-menu::before {
  content: '\fb44';
}

.app-wrapper {
  width: 100%;
  position: relative;
  padding: 16px;
}
</style>
<style scoped lang="scss">
.menu-tabs {
  :deep(.van-tabs__wrap) {
    border-radius: 15px 15px 0 0;
  }
}
</style>
