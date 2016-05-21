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
PIN_Y=50 #uppermost left pin y-coordinate
PIN_X=20 #uppermost left pin x-coordinate
PIN_SOLID=pygame.image.load('bowling_pin_solid.png')
BALL_Y=550
BALL_X=50

pygame.init()
DISPLAYSURF=pygame.display.set_mode((WIDTH,HEIGHT))
    
pygame.display.set_caption('Bowling game')
DISPLAYSURF.fill(LIGHT_BLUE)

def displayPins(DISPLAYSURF):
	dx=0
	for i in range(4):
		DISPLAYSURF.blit(PIN_SOLID,(PIN_X+dx,PIN_Y))
		dx=dx+160
	dx=0
	for j in range(3):
		DISPLAYSURF.blit(PIN_SOLID,(PIN_X+90+dx,PIN_Y+90))
		dx=dx+150
	dx=0
	for k in range(2):
		DISPLAYSURF.blit(PIN_SOLID,(PIN_X+160+dx,PIN_Y+190))
		dx=dx+140
	DISPLAYSURF.blit(PIN_SOLID,(PIN_X+230,PIN_Y+290))

def displayBallsLeft(DISPLAYSURF):
	dx=0
	for i in range(10):
		BALL=pygame.draw.circle(DISPLAYSURF, (255,255,255), (BALL_X+dx,BALL_Y),15,0)
		dx=dx+50
#main game loop
while True:
    for event in pygame.event.get():
    	#display pins to knock down
    	displayPins(DISPLAYSURF)
    	displayBallsLeft(DISPLAYSURF)
        if event.type==QUIT:
            pygame.quit()
            sys.exit()
    pygame.display.update()
    