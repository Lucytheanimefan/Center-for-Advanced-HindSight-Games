import random, pygame, sys
from pygame.locals import *

(WIDTH,HEIGHT)=(600,600)

# colors
RED=(255,0,0)
LIGHT_BLUE=(142,180,215)#background color

#frames per second
FPS=30
fpsClock=pygame.time.Clock()

#graphics/images
PIN_SOLID=pygame.image.load('bowling_pin_solid.png')

pygame.init()
DISPLAYSURF=pygame.display.set_mode((WIDTH,HEIGHT))
    
pygame.display.set_caption('Bowling game')
DISPLAYSURF.fill(LIGHT_BLUE)

def displayPins(DISPLAYSURF):
	dx=0
	for i in range(4):
		DISPLAYSURF.blit(PIN_SOLID,(10+dx,40))
		dx=dx+160
	dx=0
	for j in range(3):
		DISPLAYSURF.blit(PIN_SOLID,(100+dx,130))
		dx=dx+150
	dx=0
	for k in range(2):
		DISPLAYSURF.blit(PIN_SOLID,(170+dx,230))
		dx=dx+140
	DISPLAYSURF.blit(PIN_SOLID,(240,330))

#main game loop
while True:
    for event in pygame.event.get():
    	#display pins to knock down
    	displayPins(DISPLAYSURF)
        if event.type==QUIT:
            pygame.quit()
            sys.exit()
    pygame.display.update()
    