import { Component, OnInit } from '@angular/core'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/js/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { Scene, MeshToonMaterial } from 'three'
import { headersToString } from 'selenium-webdriver/http'

@Component({
  selector: 'app-threejs',
  templateUrl: './threejs.component.html',
  styleUrls: ['./threejs.component.scss']
})
export class ThreejsComponent implements OnInit {
  // Loader
  private _draco = new DRACOLoader()
  private _loader = new GLTFLoader()

  // Scene
  private _sceneLoaded = false
  private _width = 300
  private _height = 260
  private _scene = new THREE.Scene()
  private _camera = new THREE.PerspectiveCamera(
    45,
    this._width / this._height,
    1,
    100
  )
  private _renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  private _light = new THREE.DirectionalLight(0xffffff)

  // Dice
  private _dicePath = [
    '../../assets/dices/d4.glb',
    '../../assets/dices/d6.glb',
    '../../assets/dices/d8.glb',
    '../../assets/dices/d10.glb',
    '../../assets/dices/d12.glb',
    '../../assets/dices/d20.glb'
  ]
  private _diceObj = Array<THREE.Object3D>(6)
  private _diceMap: Map<string, THREE.Mesh>

  // DiceRoller
  raycaster = new THREE.Raycaster()
  mouse = new THREE.Vector2()

  constructor() {}

  ngOnInit() {
    this._init()
    this._render()
  }

  private _init = () => {
    this._renderer.setPixelRatio(window.devicePixelRatio)
    this._renderer.setSize(this._width, this._height)
    document
      .querySelector('#scene')
      .appendChild(this._renderer.domElement)
      .addEventListener(
        'click',
        event => {
          event.preventDefault()
          const bounds = document
            .querySelector('#scene')
            .getBoundingClientRect()
          this.mouse.x =
            ((event.x - bounds.left) / (bounds.right - bounds.left)) * 2 - 1
          this.mouse.y =
            -((event.y - bounds.top) / (bounds.bottom - bounds.top)) * 2 + 1

          this.raycaster.setFromCamera(this.mouse, this._camera)
          let intersects = this.raycaster.intersectObjects(
            this._scene.children,
            true
          )
          if (intersects.length > 0) {
            intersects[0].object.parent.rotateY(0.1)
          }
        },
        false
      )

    this._light.position.z = 5
    this._camera.position.y = 12
    this._camera.lookAt(0, 0, 0)
    this._scene.add(this._light)

    this._draco.setDecoderPath('../../assets/libs/draco/')
    this._loader.setDRACOLoader(this._draco)
    this._loadObjects(this._dicePath)
    this._scene.rotateX(-0.785398163)
    this._diceMap = this._mapDices()
  }

  private _render = () => {
    window.requestAnimationFrame(this._render)
    if (this._sceneLoaded) {
      //this._scene.rotateY(0.01);
    }
    this._renderer.render(this._scene, this._camera)
  }

  private _loadObjects = (objectPath: string[]) => {
    let totalProgress = 0

    const checkProgress = progress => {
      totalProgress = Math.min(totalProgress + progress, 100)
      console.log(totalProgress.toFixed(2))
    }

    for (let i = 0; i < objectPath.length; i++) {
      this._loader.load(
        objectPath[i],
        gltf => {
          this._diceObj[i] = gltf.scene
          this._diceObj[i].traverse(child => {
            if (child instanceof THREE.Mesh) {
              if (child.material['name'] === 'Dice')
                child.material = new MeshToonMaterial({ color: 0x1f1f1f })
              else child.material = new MeshToonMaterial({ color: 0xff6100 })
            }
          })
          this._diceObj[i].scale.set(1.5, 1.5, 1.5)
          this._diceObj[i].position.set(
            3.5 * Math.cos(i * ((2 * Math.PI) / objectPath.length)),
            -0.5,
            3.5 * Math.sin(i * ((2 * Math.PI) / objectPath.length))
          )
          this._scene.add(this._diceObj[i])

          if (totalProgress === 100) {
            this._sceneLoaded = true
            const d20Pos = this._diceObj[5].position.clone()
            const d12Pos = this._diceObj[4].position.clone()
            this._diceObj[5].position.set(0, -0.5, 0)
            this._diceObj[4].position.fromArray(d20Pos.toArray())
            this._diceObj.push(this._diceObj[3].clone())
            this._diceObj[6].position.fromArray(d12Pos.toArray())
            this._scene.add(this._diceObj[6])
          }
        },
        xhr =>
          checkProgress(((xhr.loaded / xhr.total) * 100) / objectPath.length)
      )
    }
  }

  private _mapDices = (): Map<string, THREE.Mesh> => {
    const map = new Map()
    map.set('d4', this._diceObj[0])
    map.set('d6', this._diceObj[1])
    map.set('d8', this._diceObj[2])
    map.set('d10', this._diceObj[3])
    map.set('d12', this._diceObj[4])
    map.set('d20', this._diceObj[5])
    return map
  }
}
