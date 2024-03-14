<script setup>
import {
  RouterLink, 
  RouterView
} from 'vue-router'
</script>

<template>

  <div class="container">
    <nav class="navbar sticky-top mb-3">
      <div class="container-fluid">
        <a class="navbar-brand text-warning" href="#">
          <h2>ollamaGen</h2>

          </a>
        <button class="navbar-toggler text-warning bg-warning" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon text-warning"></span>
        </button>
        <div class="offcanvas offcanvas-end bg-warning" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-header">
            <h2 class="offcanvas-title" id="offcanvasNavbarLabel">ollamaGen</h2>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item">
                <RouterLink to="/" class="nav-link active" aria-current="page">
                  Home
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/settings" class="nav-link" >
                  Settings
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/models" class="nav-link" >
                  Models
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/voice" class="nav-link" >
                  Voice
                </RouterLink>
              </li>
              <!--li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li-->
            </ul>

          </div>
        </div>
      </div>
    </nav>
    <div class="row justify-content-center .align-items-center">
      <RouterView />
    </div>
  </div>

</template>

<style .scoped>
body,
div.cont {
  background-color: black;
  height: 100vh;
}

.board {
  height: 70vh;
}

.nav-link {
  color: var(--text-warning);
}
</style>
