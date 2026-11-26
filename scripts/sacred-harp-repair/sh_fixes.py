# Sacred Harp 1991 repairs, transcribed from the sheet JPEGs (OCR of public/hymnal-media/sh-sheet/<n>.1.jpg,
# image-checked where OCR was ambiguous). Each value: (title/firstLine, [stanzas]); stanza lines joined by \n.
FIX = {}
def add(n, first, *stanzas, title=None):
    # A stanza starting 'CHORUS:' is stored with isChorus=True, where it sits in the list.
    FIX[n] = dict(title=title or first, firstLine=first, verses=[
        {'isChorus': s.startswith('CHORUS:'), 'text': s.replace('CHORUS:', '', 1).strip(chr(10))} for s in stanzas])

add('411', 'Come, let us raise our voices high',
"""Come, let us raise our voices high,
And form a sacred song,
To Him who rules the earth and sky,
And does our days prolong.
Who thru the night gave us to rest,
This morning cheered our eyes;
And with the thousands of the blest,
In health made us to rise.""",
"""Early to God we'll send our prayer,
Make haste to pray and praise,
That He may make our good His care,
And guide us all our days.
And when the night of death comes on,
And we shall end our days;
May His rich grace the theme prolong,
Of His eternal praise.""")

add('372', 'My soul, be on thy guard',
"""My soul, be on thy guard,
Ten thousand foes arise;
The hosts of sin are pressing hard
To draw thee from the skies.
O watch and fight and pray;
The battle ne'er give o'er;
Renew it boldly every day,
And help divine implore.""",
"""Ne'er think the vict'ry won,
Nor lay thine armor down;
Thy arduous work will not be done
Till thou obtain thy crown.
Fight on, my soul, till death
Shall bring thee to thy God;
He'll take thee, at thy parting breath,
To His divine abode.""")

add('531', 'Dear Lord, forgive my sins, I pray',
"""Dear Lord, forgive my sins, I pray,
And lead me in the narrow way,
O Lord, give me strength day by day.
Have mercy, Lord, for this I pray.""")

add('384', 'Oh, when will the period appear',
"""Oh, when will the period appear,
When I shall unite in your song?
I'm weary of lingering here,
And I to your Savior belong.
I'm fettered and chained up in clay,
I struggle and pant to be free;
I long to be soaring away,
My God and my Savior to see.""")

add('521', 'Our cheerful voices let us raise',
"""Our cheerful voices let us raise,
And sing a parting song;
Although I'm with you now, my friends,
I can't be with you long.
For I must go and leave you all;
It fills my heart with pain;
Although we part, perhaps in tears,
I hope we'll meet again.""")

add('432', "Grace, 'tis a most delightful theme",
"""Grace, 'tis a most delightful theme,
'Tis grace that rescues guilty man,
'Tis grace divine, all conquering, free,
Or it had never rescued me.""")

add('311', 'Come, sound His praise abroad',
"""Come, sound His praise abroad,
And hymns of glory sing;
Jehovah is the sov'reign Lord,
The universal King.
Hallelujah, hallelujah, hallelujah,
Hallelujah, hallelujah, Praise ye the Lord!""")

# 358 runs onto page 359 ("Murillo's Lesson. Concluded."); both pages read.
add('358', "As down a lone valley with cedars o'erspread",
"""As down a lone valley with cedars o'erspread,
From war's dread confusion I pensively strayed,
The gloom from the face of fair heaven retired;
The winds hushed their murmurs, the thunders expired;
Perfumes as of Eden flowed sweetly along,
A voice as of angels enchantingly sung,
Columbia, Columbia, to glory arise,
The queen of the world and the child of the skies!""",
"""Fair science her gate to thy sons shall unbar,
And the east see thy morn hide the beams of her star;
New bards and new sages unrivaled shall soar
To fame unextinguished when time is no more;
To thee, the last refuge of virtue designed,
Shall fly from all nations the best of mankind;
There grateful to heaven, with transport shall bring
To Jesus, the Author of nations, will sing.""")

add('404', 'Youth, like the spring, will soon be gone',
"""Youth, like the spring, will soon be gone,
By fleeting Time or conqu'ring Death,
Your morning sun may set at noon,
And leave you ever in the dark.
Your sparkling eyes and glowing cheeks,
Must wither like the blasted rose.
The coffin, earth and winding sheet,
Will soon your active limbs enclose.""",
"""Ye heedless ones that wildly stroll,
The grave will soon become your bed,
Where silence reigns and vapors roll
In solemn darkness 'round your head.
Your friends will pass the lonesome place,
And with a sigh move slowly on.
Still gazing on the spires of grass,
With which your graves are overgrown.""",
"""Ye blooming youth, this is the state
Of all who do free grace refuse,
And soon with you 'twill be too late
The way of life and Christ to choose.
Come, lay your carnal weapons by,
No longer fight against your God;
But with the gospel now comply,
And heav'n shall be your great reward.""")

# 158: the book abridges Heber ("But wide arms", "But sunshine") — transcribed as printed.
add('158', 'Thou art gone to the grave, but we will not deplore thee',
"""Thou art gone to the grave, but we will not deplore thee,
Tho' sorrows and darkness encompass the tomb;
The Savior has passed thro' its portals before thee,
And the lamp of His love is thy guide thro' the gloom.""",
"""Thou art gone to the grave, we no longer behold thee,
Nor tread the rough paths of the world by thy side;
But wide arms of mercy are spread to enfold thee,
And all sinners may hope, since the Savior hath died.""",
"""Thou art gone to the grave, and thy cradle's forsaken,
With us thy fond spirit did not tarry long,
But sunshine of heaven beamed bright on thy waking,
And the sound thou didst hear was the seraphim's song.""",
"""Thou art gone to the grave, but 'twere wrong to deplore thee,
When God was thy ransom, and guardian and guide;
He gave thee, and took thee, and soon will restore thee,
Where death hath no sting, since the Savior hath died.""")

# 292: the book prints "death's anxious chain" (Wesley wrote "envious") — kept as printed.
add('292', 'Behold the Savior of mankind',
"""Behold the Savior of mankind
Nailed to the shameful tree!
How vast the love that Him inclined
To bleed and die for thee!
Hark, how He groans! while nature shakes,
And earth's strong pillars bend!
The temple's veil in sunder breaks,
The solid marbles rend.""",
"""'Tis done! the precious ransom's paid!
Receive my soul, He cries:
See where He bows His sacred head!
He bows His head and dies.
But soon He'll break death's anxious chain,
And in full glory shine!
O Lamb of God, was ever pain,
Was ever love like Thine?""")

# 295: ODEM (First), lower half of the page (upper half is ROCKY ROAD concluded).
add('295', "Let ev'ry mortal ear attend",
"""Let ev'ry mortal ear attend,
And ev'ry heart rejoice;
The trumpet of the Gospel sounds,
With an inviting voice.""",
"""Eternal wisdom has prepared
A soul-reviving feast;
And bids your longing appetites
The rich provisions taste.""",
"""Ho! ye that pant for living streams,
And pine away and die;
Here you may quench your raging thirst
With springs that never dry.""")

add('170', 'Oh! may I worthy prove to see',
"""Oh! may I worthy prove to see
The saints in full prosperity,
Then my troubles will be over.
To see the bride, the glitt'ring bride,
Close seated by my Savior's side.
Then my troubles will be over.""",
"""CHORUS:I never shall forget the day
When Jesus washed my sins away,
And then my troubles will be over,
Will be over, will be over,
And rejoicing,
And then my troubles will be over.""",
"""I'll praise Him while He gives me breath,
I hope to praise Him after death.
Then my troubles will be over.
I hope to praise Him when I die,
And shout salvation as I fly!
Then my troubles will be over.""",
"""I soon shall pass the vale of death,
And in His arms resign my breath,
Then my troubles will be over.
O then my happy soul shall tell
My Jesus has done all things well,
Then my troubles will be over.""")

add('167', 'Pray, brethren, pray, the prayer of faith availeth',
"""Pray, brethren, pray, the prayer of faith availeth;
Pray, brethren, pray, on God your spirit stay.""",
"""CHORUS:A few more days of sorrow, and the Lord will call us home,
To walk the golden streets of the new Jerusalem.""",
"""Sing, brethren, sing, rejoice with joy and gladness;
Sing, brethren, sing, your songs of triumph bring.""",
"""Rise, brethren, rise, your souls by faith ascending;
Rise, brethren, rise, your home is in the skies.""")

add('498', 'Oh, Resurrection Day!',
"""Oh, Resurrection Day!
When Christ the Savior comes some morning fair,
The grave will open wide
And saints will rise to meet Him in the air.
Oh! May we meet in Heav'n
To sing the praises of our Lord and King.""")

# 302: LOGAN runs onto page 303 ("Logan. Concluded."); the second section is one shared text.
add('302', 'The day is past and gone',
"""The day is past and gone,
The evening shades appear;
O may we all remember well
The night of death draws near;""",
"""Lord, keep us safe this night,
Secure from all our fears;
May angels guard us while we sleep,
Till morning light appears;""",
"""CHORUS:And when our days are past,
And we from time remove,
O may we in Thy bosom rest,
The bosom of Thy love,
So death will soon disrobe us all
Of what we here possess.""")

add('340', 'Wonderful things of men are said',
"""Wonderful things of men are said
When they have passed away;
Flowers adorn the narrow bed
Over the lifeless clay.""",
"""CHORUS:Give me the roses while I live,
Something to cheer me on;
Useless the flowers you may give
After the soul is gone.""",
"""Life is the time for words of praise,
Hands clasp with friendly smile,
Blessings to cheer a pilgrim's days,
Are always well worthwhile.""")

add('328', 'Oh, for a heart to praise my God',
"""Oh, for a heart to praise my God,
A heart from sin set free;
A heart that's sprinkled with His blood,
So freely shed for me.
Oh, for a heart submissive, meek,
My great Redeemer's throne;
Where only Christ is heard to speak,
Where Jesus reigns alone.""",
"""Oh, for an humble, contrite heart,
Believing, true and clean,
Which neither life nor death can part
From Him that dwells within.
A heart in ev'ry thought renewed,
And full of love divine;
Perfect, and right, and pure, and good,
A copy, Lord, of Thine.""")

add('396', 'Oh, could I speak the matchless worth',
"""Oh, could I speak the matchless worth,
Oh, could I sound the glories forth,
Which in my Savior shine,
I'd soar and touch the heav'nly strings,
And vie with Gabriel while he sings
In notes almost divine.""",
"""Well, the delightful day will come,
When my dear Lord will take me home,
And I shall see His face;
Then with my Savior, Brother, Friend,
A blest eternity I'll spend,
Triumphant in His grace.""")

# 420: BISHOP, lower half of the page (upper half is MELANCHOLY DAY concluded).
add('420', "Our Father's gone to that bright land",
"""Our Father's gone to that bright land,
He dwells with Christ, the King;
And with the saints of old doth stand,
While all the angels sing.""",
"""Around dear Mother's bed we stood
And watched her dying face;
While Jesus bade her spirit come
And take a heav'nly place.""",
"""Their forms on earth no more we see,
They're hidden from our view;
Their mem'ries linger still with me,
As noble, good and true.""",
"""Could we but stand and view that goal,
'Twould dry our briny tears;
True love and joy there to behold,
Would banish all our fears.""")

add('510', 'Holy Spirit, faithful guide',
"""Holy Spirit, faithful guide,
Ever near the Christian's side;
Gently lead us by the hand,
Pilgrims in a barren land;""",
"""CHORUS:Weary souls fore'er rejoice
While they hear that sweetest voice,
Whisper softly, "Follow me,
I'll guide thee home.\"""",
"""Ever present, truest friend,
Ever near Thine aid to lend,
Leave us not to doubt and fear,
Groping on in darkness drear;""")

add('179', 'I find myself placed in a state of probation',
"""I find myself placed in a state of probation,
Which God has commanded us well to improve,
And I am resolved to regard all His precepts,
And on in the way of obedience to move.
I know I must go through great tribulation,
And many sore conflicts on every hand;
But grace will support and comfort my spirit,
And I shall be able forever to stand.""",
"""I'm called to contend with the powers of darkness,
And many sore conflicts I have to pass through.
O Jesus, be with me in every battle,
And help me my enemies all to subdue.
If Thou, gracious Lord, will only be with me,
To aid and direct me, then all will be right;
Apollyon, with all his powerful forces,
In Thy name and Thy strength shall soon put to flight.""")

add('162', 'Hark! from the tomb a doleful sound',
"""Hark! from the tomb a doleful sound,
Mine ears, attend the cry,
Ye living men, come view the ground
Where you must shortly lie.""",
"""Princes, this clay must be your bed,
In spite of all your tow'rs;
The tall, the wise, the rev'rend head,
Must lie as low as ours.""",
"""Great God! is this our certain doom?
And are we still secure?
Still walking downward to the tomb,
And yet prepared no more!""")

add('140', 'Hail, solitude, thou gentle queen',
"""Hail, solitude, thou gentle queen,
Of modest air and brow serene!
'Tis thou inspires the poet's theme,
Wrapped in sweet vision's airy dream.""",
"""With Thee the charms of life shall last,
E'en when the rosy bloom is past.
When slowly pacing time shall spread
Thy silver blossom o'er my head,
No more with this vain world perplexed,
Thou shalt prepare me for the next.""")

add('376', 'Ye souls who are bound unto Canaan',
"""Ye souls who are bound unto Canaan,
Come join in and help me to sing
The praises of my loving Jesus,
My Prophet, my Priest, and my King.
His name is most sweetly melodious,
'Twill help you most swiftly to move,
While Jesus Himself is the leader,
We're bound by the cords of His love.""")

add('182', "Let ev'ry creature join",
"""Let ev'ry creature join
To praise th'eternal God;
Ye heav'nly hosts, the song begin,
And sound His name abroad.""",
"""Thou sun with golden beams,
And moon with paler rays;
Ye starry lights, ye twinkling flames,
Shine to your Maker's praise.""")

add('143', "While Thee I seek, protecting Pow'r",
"""While Thee I seek, protecting Pow'r,
Be my vain wishes stilled,
And may this consecrated hour
With better hopes be filled.
Thy love the pow'r of tho't bestowed,
To Thee my tho'ts would soar;
Thy mercy o'er my life has flowed,
That mercy I adore.""",
"""In each event of life, how clear
Thy ruling hand I see!
Each blessing to my soul more dear,
Because conferred by Thee.
In ev'ry joy that crowns my days,
In ev'ry pain I bear,
My heart shall find delight in praise,
Or seek relief in prayer.""",
"""When gladness wings my favored hour,
Thy love my thoughts shall fill;
Resigned when storms of sorrow lower,
My soul shall meet Thy will.
My lifted eye, without a tear,
The gath'ring storm shall see;
My steadfast heart shall know no fear,
That heart shall rest on Thee.""")

add('339', "Shed not a tear o'er your friend's early bier",
"""Shed not a tear o'er your friend's early bier,
When I am gone, when I am gone;
Smile when the slow tolling bell you shall hear,
When I am gone, when I am gone.
Weep not for me as you stand 'round my grave,
Think who has died His beloved to save,
Think of the crown all the ransomed shall wear,
When I am gone, I am gone.""",
"""Plant you a rose that shall bloom o'er my grave,
When I am gone, when I am gone;
Sing a sweet song such as angels may have,
When I am gone, when I am gone.
Praise ye the Lord that I'm freed from all care,
Pray ye the Lord that my joys ye shall share,
Look up on high and believe that I'm there,
When I am gone, I am gone.""")

add('371', "Come, Holy Spirit, heav'nly Dove",
"""Come, Holy Spirit, heav'nly Dove,
With all Thy quick'ning pow'rs,
Kindle a flame of sacred love
In these cold hearts of ours.""",
"""Come, Holy Spirit, heav'nly Dove,
With all Thy quick'ning pow'rs,
Come, shed abroad a Savior's love,
And that shall kindle ours.""")

add('422', 'Oh, for a heart to praise my God',
"""Oh, for a heart to praise my God,
A heart from sin set free,
A heart made clean by Thy rich blood,
So freely shed for me.""")

add('322', "The glorious plan of man's redemption",
"""The glorious plan of man's redemption,
By the Son of God was wrought,
To save the lost and ruined nation,
So to heav'n we might be brought,""",
"""CHORUS:Glory, honor, and salvation,
To the Lamb, who once was slain;
Sound His praise through ev'ry nation,
May it never cease again.""",
"""His precious blood to save us streamed,
Lo! He sends salvation free,
And now the poor by Him redeemed,
Find both life and liberty.""",
"""And now, dear friends, what more is wanted,
Than what is already done,
Christ has to Himself sinners granted,
Will you then to ruin run?""")

add('429', 'Peace, troubled soul, thou need not fear',
"""Peace, troubled soul, thou need not fear,
Thy Great Provider still is near,
Jesus says He will be with us to the end.""",
"""CHORUS:And He has been with us, And He yet is with us,
And He's promised to be with us to the end.""",
"""Who fed thee last, will feed thee still,
Be calm and sink into His will,
Jesus says He will be with us to the end.""",
"""The Lord, who built the earth and sky,
In mercy stoops to hear thy cry,
Jesus says He will be with us to the end.""",
"""His promise all may freely claim,
Ask, and receive in Jesus' name,
Jesus says He will be with us to the end.""")

add('431', 'Ere mountains reared their forms sublime',
"""Ere mountains reared their forms sublime,
Or heav'n and earth in order stood,
Before the birth of ancient times,
From everlasting, Thou art God.""")

# 367: the second-section half-lines are assigned to stanzas by rhyme (needs/leads, rely/supply; plea/free, call/all).
add('367', 'Awake, dear brother, sister, friend',
"""Awake, dear brother, sister, friend,
Get ready for the call
That soon or late is sure to come,
Alike to one and all.
Our Shepherd will supply our needs,
If on Him we rely;
And on to victory He leads,
When we the arms supply.""",
"""'Mid storms of doubt, in grief or woe,
While Satan's hosts surround,
Renew your zeal and onward go
To Him where joy is found.
Our Shepherd hears each humble plea,
He heeds each earnest call;
And grants salvation full and free,
For He is Lord of all.""")

add('450', 'Gently glides the stream of life',
"""Gently glides the stream of life,
Oft along the flow'ry vale,
Or impetuous down the cliff,
Rushing roars when storms assail.""",
"""Life's an ever varied flood,
Always rolling to its sea,
Slow, or quick, or mild, or rude,
Tending to eternity.""")

add('298', 'What shall I render to my God',
"""What shall I render to my God
For all His kindness shown?
My feet shall visit Thine abode,
My songs address Thy throne.""")

add('318', 'We thank the Lord of heav\'n and earth',
"""We thank the Lord of heav'n and earth,
Who hath preserved us from our birth,
For present joys, for blessings past,
And for the hope of heav'n at last.""",
"""How shall we half our task fulfill?
We thank Thee for Thy mind and will,
For present joys, for blessings past,
And for the hope of heav'n at last.""",
"""Redeemed us oft from death and dread,
And with Thy gifts our table spread,
For present joys, for blessings past,
And for the hope of heav'n at last.""")

# 189: MONTGOMERY, lower half of p. 189, concluded on p. 190 (restored 2026-11-26).
add('189', 'Early, my God, without delay',
"""Early, my God, without delay,
I haste to seek Thy face;
My thirsty spirit faints away
Without Thy cheering grace;
So pilgrims on the scorching sand,
Beneath a burning sky,
Long for a cooling stream at hand,
And they must drink or die.""")

add('178', 'Now shall my inward joys arise',
"""Now shall my inward joys arise,
And burst into a song;
Almighty love inspires my heart,
And pleasure tunes my tongue.""",
"""God, on His thirsty Zion's hill
Some mercy drops has thrown,
And solemn oaths have bound His love
To show'r salvation down.""",
"""Why do we then indulge our fears,
Suspicions and complaints?
Is He a God, and shall His grace
Grow weary of His saints?""")

add('293', 'When I can read my title clear',
"""When I can read my title clear
To mansions in the skies,
I'll bid farewell to ev'ry fear,
And wipe my weeping eyes.
Should earth against my soul engage,
And fiery darts be hurled,
Then I can smile at Satan's rage,
And face a frowning world.""",
"""There I shall bathe my weary soul
In seas of heav'nly rest,
And not a wave of trouble roll
Across my peaceful breast.
When we've been there ten thousand years,
Bright shining as the sun,
We've no less days to sing God's praise
Than when we first begun.""")

add('444', 'Oh, if my Lord would come and meet',
"""Oh, if my Lord would come and meet,
My soul should stretch her wings in haste,
Fly fearless through death's iron gate,
Nor feel the terrors as she passed.
Jesus can make a dying bed
Feel soft as downy pillows are,
While on His breast I lean my head,
And breathe my life out sweetly there.""")

# 530 concludes at the top of page 531 ("A Glad New Song. Concluded.").
add('530', "I've learned to sing a glad, new song",
"""I've learned to sing a glad, new song
Of praise unto our King!
And now with ransomed pow'rs His praises
I will sing.
I've learned to sing the song of peace,
'Tis sweeter ev'ry day,
Since Jesus calmed my troubled soul,
And bore my sins away.""",
"""I've learned to sing the song of joy,
My cup is running o'er
With blessings full of peace and love,
And still there's more and more.
Soon I shall sing the glad, new song
Of Moses and the Lamb,
With all the sainted hosts above,
Before the great I Am.""")

add('66', 'There is a land of pure delight',
"""There is a land of pure delight,
Where saints immortal reign,
Infinite day excludes the night,
And pleasures banish pain.
Sweet fields beyond the swelling flood
Stand dressed in living green,
So to the Jews old Canaan stood,
While Jordan rolled between.""",
"""O could we make our doubts remove,
Those gloomy doubts that rise,
And see the Canaan that we love
With unbeclouded eyes.
Could we but climb where Moses stood,
And view the landscape o'er,
Not Jordan's stream, nor death's cold flood
Should fright us from the shore.""")

add('454', 'The road to glory seems so long',
"""The road to glory seems so long,
And sorrows often take my song.
I'm going to a better land,
I'm going to a better land.""",
"""CHORUS:I'm going to a better land,
Where troubles are unknown,
All sorrow will be gone,
We'll sing around the throne in sweet accord,
Adoring Jesus, our dear Lord.""",
"""From Jesus' side I will not stray,
I know He'll guide me all the way.
I'm going to a better land,
I'm going to a better land.""",
"""I know it is not very far,
To heaven where my treasures are.
I'm going to a better land,
I'm going to a better land.""")

# 235: LONG SOUGHT HOME, lower half of the page (upper half is REVERENTIAL ANTHEM concluded).
add('235', 'Jerusalem! my happy home!',
"""Jerusalem! my happy home!
Oh, how I long for thee!
When will my sorrows have an end?
Thy joys when shall I see?""",
"""CHORUS:Home, sweet home, my long-sought home,
My home in heav'n above.""",
"""Thy walls are all of precious stones,
Most glorious to behold!
Thy gates are richly set with pearl,
Thy streets are paved with gold.""",
"""My friends, I bid you all adieu;
I leave you in God's care;
And if I here no more see you,
Go on; I'll meet you there.""")

# 317: JACKSON, lower half of the page (upper half is NEW HOPE concluded).
add('317', 'I am a stranger here below',
"""I am a stranger here below,
And what I am is hard to know;
I am so vile, so prone to sin,
I fear that I'm not born again.""",
"""When I experience call to mind,
My understanding is so blind,
All feeling sense seems to be gone,
Which makes me think that I am wrong.""",
"""I find myself out of the way,
My thoughts are often gone astray,
Like one alone I seem to be,
Oh, is there anyone like me?""")

# 435: SACRED REST, lower part of the page (upper part is FILLMORE concluded). Book: "care shall fill" (Watts: "cares shall seize").
add('435', 'Sweet is the day of sacred rest',
"""Sweet is the day of sacred rest,
No mortal care shall fill my breast;
Oh, may my heart in tune be found,
Like David's harp of solemn sound.""")

add('412', 'Wake, O my soul, and hail the morn',
"""Wake, O my soul, and hail the morn,
For unto us a Savior's born;
See how the angels wing their way
To usher in the glo'rous day.""",
"""CHORUS:Glory, glory, let us sing,
While heav'n and earth His praises ring,
Hosanna, Hosanna, Hosanna to the Lamb of God.""",
"""Hark! what sweet music, what a song,
Sounds from the bright celestial throng;
Sweet song, whose melting sounds impart
Joy to each raptured list'ning heart.""",
"""Come, join the angels in the sky,
Glory to God who reigns on high;
Let peace and love on earth abound,
While time revolves and years roll round.""")

add('187', 'God, my supporter, and my hope',
"""God, my supporter, and my hope,
My help forever near,
Thine arm of mercy held me up
When sinking in despair.""",
"""But to draw near to Thee, my God,
Shall be my sweet employ;
My tongue shall sound Thy works abroad,
And tell the world my joy.""")

# 488 concludes at the top of page 489 ("As We Go On. Concluded.").
add('488', 'Now, let our works and virtue show',
"""Now, let our works and virtue show,
To prove our faith as on we go,
Religion bears our spirits up,
While we expect that blessed hope.
We get the blessings of the Lord,
And we expect the great reward.
Most precious is Thy love, O Lord,
It guides us as we go along
To join that great celestial band,
To sing Thy praise forevermore.""")

# 294: ROCKY ROAD; the "My soul shall ascend" section is on page 295 ("Rocky Road. Concluded.", D.C.).
add('294', "I'm enlisted on the road",
"""I'm enlisted on the road,
I'm almost done traveling,
Enlisted on the road,
I'm almost done traveling,
I'm bound to go where Jesus is.
My soul shall ascend where Jesus is,
To enjoy the peaceful home of rest,
I'm bound to go where Jesus is,
And be there forever blest.""",
"""CHORUS:It's a mighty rocky road,
I'm almost done traveling,
A mighty rocky road,
I'm almost done traveling,
I'm bound to go where Jesus is.""",
"""I've a Father on the road,
He's almost done traveling,
A Father on the road,
He's almost done traveling,
He's bound to go where Jesus is.
His soul shall ascend where Jesus is,
To enjoy the peaceful home of rest,
He's bound to go where Jesus is,
And be there forever blest.""")

add('441', 'Hark, the glad sound! the Savior comes',
"""Hark, the glad sound! the Savior comes,
The Savior promised long:
Let ev'ry heart prepare a throne,
And ev'ry voice a song.""",
"""He comes, the pris'ner to release,
In Satan's bondage held;
The gates of brass before Him burst,
The iron fetters yield.""")

add('283', 'Come, let us join with one accord',
"""Come, let us join with one accord,
In hymns around the throne:
This is the day our risen Lord
Hath made and called His own.""",
"""CHORUS:Then let us in His name sing on,
And hasten that great day
When our Redeemer shall come down,
And shadows pass away.""",
"""This is the day which God hath blest,
The brightest of the sev'n:
A type of everlasting rest,
That saints enjoy in heav'n.""")

# 303: HEAVENLY LAND, lower half of the page (upper half is LOGAN concluded).
add('303', 'There is a land of pure delight',
"""There is a land of pure delight,
Where saints immortal reign.
Infinite day excludes the night,
And pleasures banish pain.""",
"""There everlasting springs abide,
And never with'ring flow'rs.
Death, like a narrow sea, divides
This heav'nly land from ours.""")

add('344', "'Tis by Thy strength the mountains stand",
"""'Tis by Thy strength the mountains stand,
God of eternal pow'r!
The sea grows calm at Thy command,
And tempests cease to roar.""",
"""The thirsty ridges drink their fill,
And ranks of corn appear;
Thy ways abound with blessings still,
Thy goodness crowns the year.""")

add('218', 'There is a house not made with hands',
"""There is a house not made with hands,
Eternal, and on high;
And here my spirit, waiting, stands
Till God shall bid it fly.""")

add('474', 'Unshaken as the sacred hill',
"""Unshaken as the sacred hill,
And firm as mountains be,
Firm as a rock the soul shall rest
That leans, O Lord, on Thee.""",
"""Not walls or hills could guard so well
Old Salem's happy ground,
As those eternal arms of love
That ev'ry saint surround.""")

add('268', 'David, the king, was grieved and moved',
"""David, the king, was grieved and moved,
He went to his chamber, his chamber, and wept;
And as he went he wept, and said,
O my son! O my son!
Would to God I had died
For thee, O Absalom, my son, my son!""")

add('279', 'Ye little flock whom Jesus feeds',
"""Ye little flock whom Jesus feeds,
Dismiss your anxious fears;
Look to the Shepherd of your souls,
And smile away your tears.
Tho' wolves and lions prowl around,
His staff is your defense;
'Mid sands and rocks your Shepherd's voice
Calls streams and pastures thence.""",
"""Your Father will a kingdom give,
And give it with delight;
His feeblest child His love shall call
To triumph in His sight.
A house of many mansions where
His love will banish grief,
To sit with joy at God's own throne,
And know eternal peace.""")

add('505', 'Come on, my friends, and go with me',
"""Come on, my friends, and go with me,
For I am on my journey home,
My Savior welcomes you with me
To live where joys are ever known.
With me to that fair land where ceaseless ages roll,
And roll, where ceaseless ages roll.""")

# 381: SING ON, lower half of the page.
add('381', 'Farewell, my friends, weep not for me',
"""Farewell, my friends, weep not for me;
I'm going home to God;
I'll travel in the sacred way,
The path our fathers trod.
I'll meet my friends who've gone before,
Around the great white throne;
We'll shout and sing forevermore,
And know as we are known.""",
"""My joy thru life has been to sing
Of Him who died for me,
And when I stand before the King,
His blessed face I'll see.
All glory to the Son of God,
Who died upon the tree;
We'll shout and sing with one accord,
Thru all eternity.""")

add('383', "O what of all my suff'rings here",
"""O what of all my suff'rings here,
If, Lord, Thou count me meet
With that enraptured host t'appear,
And worship at Thy feet.
Give joy or grief, give ease or pain,
Take life or friends away,
But let me find them all again
In that eternal day.""",
"""O what hath Jesus bought for me,
Before my ravished eyes?
Rivers of life divine I see,
And trees of paradise.
I see a world of spirits bright,
Who taste the pleasures there,
They all are robed in spotless white,
And conqu'ring palms they bear.""")

add('460', 'Come on, my fellow pilgrims, come',
"""Come on, my fellow pilgrims, come,
And let us all be hast'ning home,
We soon shall land on yon blest shore,
Where pains and sorrows are no more,
There we our Jesus shall adore,
Forever blest.""",
"""No period then our joys shall know,
Secure from ev'ry mortal foe;
No sickness there, no want or pain
Shall e'er disturb our rest again,
When with Immanuel we reign,
Forever blest.""")

# 515: FEDERAL STREET, lower half of the page.
add('515', 'My dear Redeemer and my Lord',
"""My dear Redeemer and my Lord,
I read my duty in Thy Word;
But in Thy life the law appears,
Drawn out in living characters.""",
"""Such was Thy truth and such Thy zeal,
Such def'rence to Thy Father's will;
Such love and meekness so divine,
I would transcribe and make them mine.""",
"""Cold mountains and the midnight air
Witnessed the fervor of Thy prayer;
The desert Thy temptations knew,
Thy conflict and Thy vict'ry, too.""",
"""Be Thou my pattern; make me bear
More of Thy gracious image here;
Then God, the Judge, shall own my name
Among the foll'wers of the Lamb.""")

add('299', 'Lo, what a glorious sight appears',
"""Lo, what a glorious sight appears
To our believing eyes;
The earth and seas are passed away,
And the old rolling skies!""",
"""From the third heav'n where God resides,
That holy, happy place,
The New Jerusalem comes down,
Adorned with shining grace.""")

add('398', "I'm dying, Mother, dying now",
"""I'm dying, Mother, dying now,
Please raise my aching head,
And fan my heated, burning brow,
Your boy will soon be dead.
Turn o'er my pillow once again,
And kiss my fevered cheek;
I'll soon be freed from all the pain,
For now I am so weak.""")

add('428', 'And am I born to die',
"""And am I born to die,
To lay this body down!
And must my trembling spirit fly
Into a world unknown?""",
"""Waked by the trumpet's sound,
I from my grave shall rise;
And see the Judge with glory crowned,
And see the flaming skies.""")

# 254: Billings's anthem, pp. 254-259 (pages 255-259 restored to the sheet 2026-11-26 by add_continuation_pages.py).
add('254', 'I am the rose of Sharon and the lily of the valley',
"""I am the rose of Sharon and the lily of the valley;
As the lily among the thorns, so is my love among the daughters;
As the apple tree among the trees of the wood, so is my beloved among the sons.
I sat down under his shadow with great delight,
And his fruit was sweet to my taste.
He brought me to the banqueting house, his banner over me was love.
Stay me with flagons, comfort me with apples, for I am sick of love.
I charge you, O ye daughters of Jerusalem,
By the roes, and by the hinds of the field,
That you stir not up, nor awake my love, till he please.
The voice of my beloved! Behold! he cometh,
Leaping upon the mountains, skipping upon the hills.
My beloved spake, and said unto me,
Rise up, my love, my fair one, and come away.
For lo, the winter is past, the rain is over and gone.""")

add('270', 'Away, my unbelieving fear!',
"""Away, my unbelieving fear!
Fear shall in me no more have place;
My Savior doth not yet appear,
He hides the brightness of His face;
But shall I therefore let Him go,
And basely to the tempter yield?
No, in the strength of Jesus, no!
I never will give up my shield.""")

# 501: O'LEARY, lower half of the page. OCR dropped "not" in v1; the S.M. line needs 8 syllables (Doddridge's text).
add('501', 'And will the Judge descend',
"""And will the Judge descend,
And must the dead arise,
And not a single soul escape
His all-discerning eyes?""",
"""How will my heart endure
The terrors of that day,
When earth and heav'n before His face
Astonished shrink away?""",
"""But ere the trumpet shakes
The mansions of the dead,
Hark, from the gospel's cheering sound,
What joyful tidings spread!""")

add('418', 'There is a house not made with hands',
"""There is a house not made with hands,
Eternal and on high;
And here my spirit waiting stands
Till God shall bid it fly.""",
"""CHORUS:I long to see my friends again,
And hear them sweetly say,
Come, weary dove, Here is thy home,
Then fold thy wings and stay.""",
"""Shortly this prison of my clay
Must be dissolved and fall;
Then, O my soul, with joy obey
Thy heav'nly Father's call.""",
"""'Tis He, by His almighty grace,
That forms thee fit for heav'n;
And as an earnest of the place,
Has His own Spirit giv'n.""")

add('277', 'I know that my Redeemer lives',
"""I know that my Redeemer lives,
Glory, Hallelujah!
What comfort this sweet sentence gives,
Glory, Hallelujah!""",
"""CHORUS:Shout on, pray on, we're gaining ground,
Glory, hallelujah!
The dead's alive, and the lost is found,
Glory, hallelujah!""",
"""He lives to bless you with His love,
Glory, Hallelujah!
He lives to plead my cause above,
Glory, Hallelujah!""",
"""He lives to crush the fiends of hell,
Glory, Hallelujah!
He lives and doth within me dwell,
Glory, Hallelujah!""")

add('400', "Our praying time will soon be o'er",
"""Our praying time will soon be o'er,
Hallelujah,
We'll join with those gone on before,
Hallelujah.""",
"""CHORUS:Struggle on, struggle on,
Hallelujah,
Struggle on, for the work's most done,
Hallelujah.""",
"""To love and bless and praise the name,
Hallelujah,
Of Jesus Christ, the bleeding Lamb,
Hallelujah.""")

# 321: NEWNAN, lower half of the page (upper half is FUNERAL ANTHEM concluded, i.e. the end of 320).
add('321', 'Vain man, thy fond pursuits forbear',
"""Vain man, thy fond pursuits forbear,
Repent, thy end is nigh;
Death at the farthest can't be far,
O think before thou die.
Reflect, thou hast a soul to save,
Thy sins, how high they mount!
What are thy hopes beyond the grave?
How stands that dark account?""")

# 316 concludes at the top of page 317 ("New Hope. Concluded.").
add('316', 'Jesus, what shall I do to show',
"""Jesus, what shall I do to show
How much I love Thy charming name?
Let my whole heart with rapture glow,
Thy boundless goodness to proclaim.
Lord, if a distant glimpse of Thee
Can give such sweet, such vast delight,
What must the joy, the triumph be,
To dwell forever in Thy sight.""")

# 362: NORWICH, lower half of p. 362, continued on 363-364 (restored 2026-11-26).
add('362', "Oh, the delights, the heav'nly joys",
"""Oh, the delights, the heav'nly joys,
The glories of the place
Where Jesus sheds the brightest beams
Of His o'erflowing grace!""",
"""Sweet majesty and awful love
Sit smiling on His brow,
And all the glorious ranks above
At humble distance bow.""")

# 320 FUNERAL ANTHEM concludes at the top of page 321.
add('320', "I heard a great voice from heav'n",
"""I heard a great voice from heav'n saying unto me,
"Write from henceforth, Blessed are the dead that die in the Lord:
Yea, saith the Spirit, for they rest from their labors,
And their works which do follow them.\"""")

# 250: Jacob French's anthem, pp. 250-253 (pages 251-253 restored 2026-11-26).
add('250', 'I beheld, and lo, a great multitude',
"""I beheld, and lo, a great multitude, which no man could number:
Thousands of thousands, and ten times thousands,
Stood before the Lamb, and they had palms in their hands,
And they cease not day nor night, saying,
Holy, holy, holy, Lord God Almighty,
Which was, and is, and is to come.
And I heard a mighty angel flying thru the midst of heav'n,
Crying with a loud voice, Woe, woe, woe,
Be unto the earth by reason of the trumpet which is yet to sound.
And when the last trumpet sounded, the great men and nobles,
Rich men and poor, bond and free, gathered themselves together,
And cried to the rocks and mountains to fall upon them
And hide them from the face of Him that sitteth on the throne:
For the great day of the Lord is come, and who shall be able to stand?""")
